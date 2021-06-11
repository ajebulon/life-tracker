import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Divider,
} from "react-native-paper";

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

  card: {
    marginBottom: "2%",
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const CardItem = ({ itemObject, navigation, route }) => {
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    getDailyCount();
  }, [route.params]);

  const addOneNewMetricsDb = () => {
    const value = 1;
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "insert into metrics (timestamp, value, item_id) values (date('now'), ?, ?)",
        [value, item_id],
        [],
        (_, error) => {
          console.log(error);
        }
      );

      tx.executeSql(
        "select * from metrics where timestamp=date('now') and item_id=?",
        [item_id],
        (_, { rows }) => {
          var totalEntries = 0;
          for (let i = 0; i < rows.length; i++) {
            totalEntries += rows.item(i).value;
          }
          setDailyCount(totalEntries);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const getDailyCount = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "select * from metrics where timestamp=date('now') and item_id=?",
        [item_id],
        (_, { rows }) => {
          var totalEntries = 0;
          for (let i = 0; i < rows.length; i++) {
            totalEntries += rows.item(i).value;
          }
          setDailyCount(totalEntries);
        }
        // (_, error) => {
        //   console.log(error);
        // }
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
      style={styles.card}
      mode="outlined"
      onLongPress={() =>
        console.log("Card item-" + itemObject.id + " long-pressed")
      }
    >
      <Card.Content>
        <Title>{itemObject.title.toUpperCase()}</Title>
        <Divider />
        <Paragraph>
          Your target is {itemObject.target} per {itemObject.unit}.{" "}
          {dailyCount < itemObject.target
            ? "Keep working on it!"
            : "You've done great job!"}
        </Paragraph>
        <Text style={styles.dailyStatsTitle}>Daily Stats</Text>
        <Text style={styles.dailyStats}>{dailyCount}</Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-evenly" }}>
        <Button
          mode="contained"
          style={styles.itemButton}
          onPress={addOneNewMetricsDb}
          icon="plus"
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
