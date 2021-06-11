import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";

import { BarChart, Grid } from "react-native-svg-charts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: "2%",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 32,
  },

  stats: {
    fontSize: 64,
    marginBottom: 64,
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const SummaryScreen = ({ navigation, route }) => {
  const [metricsCount, setMetricsCount] = useState(0);
  const [dailyStats, setDailyStats] = useState([]);

  const itemObject = route.params.itemObject;
  const fill = "#8153F2";
  const data = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    null,
    85,
    undefined,
    0,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];

  useEffect(() => {
    getMetricsCount();
  }, []);

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

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const getDailyArray = () => {
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemObject.title.toUpperCase()}</Text>
      <BarChart
        style={{ height: "50%" }}
        data={data}
        svg={{ fill }}
        contentInset={{ top: 16, bottom: 16 }}
      >
        <Grid />
      </BarChart>
      <Text style={styles.stats}>{metricsCount}</Text>
      <Button onPress={goToHome} title="Home" />

    </View>
  );
};

export default SummaryScreen;
