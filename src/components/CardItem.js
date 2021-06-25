import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
    marginTop: 8,
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 8,
  },

  dailyStats: {
    fontSize: 40,
    alignSelf: "flex-end",
  },

  dailyStatsAloneContainer: {
    marginBottom: 2, 
    alignSelf: "center",
  },

  dailyStatsAlone: {
    fontSize: 40,
    // marginBottom: 8,
  },

  lastEntry: {
    fontSize: 12,
    alignSelf: "flex-start",
  },

  card: {
    marginBottom: "2%",
  },

  cardSuccess: {
    backgroundColor: "#f2fde4",
  },

  cardSuccessBackground: {
    backgroundColor: "#f2fde4",
    // backgroundColor: "#ffffff",
    position: "absolute",
    resizeMode: "cover",
    width: 45,
    height: 45,
    top: 0,
    right: 0,
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const CardItem = ({ itemObject, navigation, route, setRenderFlag }) => {
  const [dailyCount, setDailyCount] = useState(0);
  const [lastRecord, setLastRecord] = useState(0);
  const dailyTarget =
    itemObject.unit === "day"
      ? itemObject.target
      : Math.ceil(itemObject.target / 7);
  const image = require("../../assets/check-mark.png");

  useEffect(() => {
    getDailyCount();
    getLastRecord();
  }, [route.params]);

  const addOneNewMetrics = () => {
    const alertMsg =
      "Add single record to " + itemObject.title.toUpperCase() + "?";
    Alert.alert("", alertMsg, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          addOneNewMetricsDb();
        },
      },
    ]);
  };

  const addOneNewMetricsDb = () => {
    const value = 1;
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "insert into metrics (timestamp, value, item_id) values (datetime('now'), ?, ?)",
        [value, item_id],
        [],
        (_, error) => {
          console.log(error);
        }
      );
    });

    getDailyCount();
    getLastRecord();
  };

  const getDailyCount = () => {
    const item_id = itemObject.item_id;

    var todayDate = new Date();
    const tzoneOffset = todayDate.getTimezoneOffset() / 60;
    todayDate.setUTCHours(todayDate.getUTCHours() - tzoneOffset);
    todayDate = todayDate.toISOString();

    db.transaction((tx) => {
      tx.executeSql(
        "select *, datetime(timestamp,'localtime') as timestamp from metrics where timestamp >= date('now','-1 days') and item_id=?",
        [item_id],
        (_, { rows }) => {
          var totalEntries = 0;
          for (let i = 0; i < rows.length; i++) {
            if (todayDate.includes(rows.item(i).timestamp.slice(0, 10))) {
              totalEntries += rows.item(i).value;
            }
          }
          setDailyCount(totalEntries);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const getLastRecord = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "select *, MAX(metric_id) from metrics where datetime(timestamp,'localtime') >= date('now') and item_id=?",
        [item_id],
        (_, { rows }) => {
          if (rows.item(0).value !== null) {
            setLastRecord(rows.item(0).value);
          } else {
            setLastRecord(0);
          }
        }
      );
    });
  };

  const deleteItemFromMetricsDb = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "delete from metrics where item_id=?",
        [item_id],
        [],
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const deleteItemFromItemsDb = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "delete from items where item_id=?",
        [item_id],
        [],
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const deleteItem = () => {
    const alertMsg =
      "Do you want to delete " + itemObject.title.toUpperCase() + "?";
    Alert.alert("", alertMsg, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteItemFromMetricsDb();
          deleteItemFromItemsDb();
          setRenderFlag(true);
        },
      },
    ]);
  };

  const delOneLastMetrics = () => {
    const alertMsg =
      "Undo last record from " + itemObject.title.toUpperCase() + "?";

    if (dailyCount == 0) {
      return;
    }

    Alert.alert("", alertMsg, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          delOneLastMetricsDb();
        },
      },
    ]);
  };

  const delOneLastMetricsDb = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "delete from metrics where metric_id = (select MAX(metric_id) from metrics where datetime(timestamp,'localtime') >= date('now') and item_id=?)",
        [item_id],
        () => {
          getDailyCount();
          getLastRecord();
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

  const renderSuccessIcon = () => {
    if (dailyCount >= dailyTarget) {
      return <Card.Cover source={image} style={styles.cardSuccessBackground} />;
    } else {
      return null;
    }
  };

  return (
    <Card
      style={[styles.card, dailyCount < dailyTarget ? "" : styles.cardSuccess]}
      mode="outlined"
      onLongPress={deleteItem}
      onPress={goToSummary}
    >
      <Card.Content>
        <Title>{itemObject.title.toUpperCase()}</Title>
        <Divider />
        <Paragraph>
          Your target is {dailyTarget} per {itemObject.unit}.{" "}
          {dailyCount < dailyTarget
            ? "Keep working on it!"
            : "You've done great job!"}
        </Paragraph>
        <Text style={styles.dailyStatsTitle}>Daily Stats</Text>
        {lastRecord > 0 ? (
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 2 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dailyStats}>{dailyCount}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.lastEntry}>(+{lastRecord})</Text>
            </View>
          </View>
        ) : (
          <View style={{...styles.dailyStatsAloneContainer, flex: 1, flexDirection: "row"}}>
            <Text style={styles.dailyStatsAlone}>{dailyCount}</Text>
          </View>
        )}

        {renderSuccessIcon()}
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-evenly" }}>
        <Button
          mode="contained"
          style={styles.itemButton}
          onPress={addOneNewMetrics}
          icon="plus"
        >
          {/* Plus */}
        </Button>
        {/* <Button
          mode="contained"
          style={styles.itemButton}
          onPress={goToSummary}
          icon="poll"
        > */}
        {/* Summary */}
        {/* </Button> */}
        <Button
          mode="contained"
          style={styles.itemButton}
          icon="timer"
          onPress={goToCounter}
        >
          {/* Counter */}
        </Button>
        <Button
          mode="contained"
          style={styles.itemButton}
          icon="undo"
          onPress={delOneLastMetrics}
        >
          {/* Counter */}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardItem;
