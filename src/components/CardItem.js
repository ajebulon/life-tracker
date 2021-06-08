import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Text } from "react-native-paper";

import * as SQLite from "expo-sqlite";

const styles = StyleSheet.create({
  itemButton: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },

  dailyStatsTitle: {
    marginTop: 32,
    fontSize: 20,
    alignSelf: "center",
  },

  dailyStats: {
    marginBottom: 16,
    fontSize: 64,
    alignSelf: "center",
  },

});

const db = SQLite.openDatabase("lifetracker.db");

const CardItem = ({ itemObject, navigation }) => {
  const [metricsCount, setMetricsCount] = useState(0);

  useEffect(() => {
    getMetricsCount();
  }, []);

  const addOneNewMetricsDb = () => {
    const timestamp = new Date().toISOString();
    const value = 1;
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "insert into metrics (timestamp, value, item_id) values (?, ?, ?)",
        [timestamp, value, item_id],
        [],
        (_, error) => {
          console.log(error);
        }
      );

      tx.executeSql(
        "select * from metrics where item_id=?",
        [item_id],
        (_, { rows }) => {
          // console.log(JSON.stringify(rows));
          setMetricsCount(rows.length);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const delOneLastMetricsDb = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "delete from metrics where metric_id = (select MAX(metric_id) from metrics where item_id=?)",
        [item_id],
        () => {
          getMetricsCount();
        }
      );
    });
  };

  const getMetricsCount = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "select * from metrics where item_id=?",
        [item_id],
        (_, { rows }) => {
          setMetricsCount(rows.length);
        }
      );
    });
  };

  const goToSummary = () => {
    navigation.navigate("Summary", { itemObject: itemObject });
  };

  const goToCounter = () => {
    navigation.navigate("Counter", { itemObject: itemObject });
  };

  return (
    <Card
      mode="outlined"
      onLongPress={() =>
        console.log("Card item-" + itemObject.id + " long-pressed")
      }
    >
      <Card.Content>
        <Title>{itemObject.title.toUpperCase()}</Title>
        <Paragraph>
          Your target is {itemObject.target} per {itemObject.unit}. {(metricsCount < itemObject.target) ? "Keep working on it!" : "You've done great job!"}
        </Paragraph>
        <Text style={styles.dailyStatsTitle}>Daily Stats</Text>
        <Text style={styles.dailyStats}>{metricsCount}</Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-evenly" }}>
        <Button
          mode="contained"
          style={styles.itemButton}
          onPress={addOneNewMetricsDb}
          onLongPress={delOneLastMetricsDb}
          icon="plus-thick"
        >
          {/* Plus */}
        </Button>
        <Button
          mode="contained"
          style={styles.itemButton}
          onPress={goToSummary}
          icon="poll"
        >
          {/* Summary */}
        </Button>
        <Button 
          mode="contained" 
          style={styles.itemButton}
          icon="timer"
          onPress={goToCounter}
          >
          {/* Counter */}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardItem;
