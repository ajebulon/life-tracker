import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";

import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: "2%",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 32,
    alignSelf: "center",
  },

  stats: {
    fontSize: 64,
    marginBottom: 64,
    alignSelf: "center",
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const SummaryScreen = ({ navigation, route }) => {
  const [metricsCount, setMetricsCount] = useState(0);
  const [dailyStats, setDailyStats] = useState([]);
  const [dateStats, setDateStats] = useState([]);

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
    getDailyArray();
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

  const getLastWeekDates = () => {
    const refDate = new Date();
    var lastWeekDates = [];

    var lastWeekDate = new Date();
    for (let i = -6; i <= 0; i++) {
      lastWeekDate.setDate(refDate.getDate() + i);
      lastWeekDates.push(lastWeekDate.toISOString());
    }
    return lastWeekDates;
  };

  const getDailyArray = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "select * from metrics where timestamp>date('now','-7 day') and item_id=?",
        [item_id],
        (_, { rows }) => {
          const lastWeekDates = getLastWeekDates();
          const lastWeekDailyStats = new Array(7).fill(0);

          /* For each found entry */
          for (let i = 0; i < rows.length; i++) {
            for (let dateIdx = 0; dateIdx < lastWeekDates.length; dateIdx++) {
              /* Find corresponding date */
              if (lastWeekDates[dateIdx].includes(rows.item(i).timestamp) > 0) {
                /* Update the value */
                lastWeekDailyStats[dateIdx] += rows.item(i).value;
                break;
              }
            }
          }

          /* Remove first zero values (non-existing data) */
          var cleanDailyStats = [];
          var cleanFlag = false;
          var cleanDates = [];

          for (let i = 0; i < lastWeekDailyStats.length; i++) {
            if (lastWeekDailyStats[i] > 0 || cleanFlag) {
              cleanFlag = true;
              cleanDailyStats.push(lastWeekDailyStats[i]);
              cleanDates.push(lastWeekDates[i]);
            }
          }
          setDailyStats(cleanDailyStats);
          setDateStats(cleanDates);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemObject.title.toUpperCase()}</Text>
      <YAxis 
        data={dailyStats}
        formatLabel={(value) => value}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{ fontSize: 16, fill: "black" }}

      >
      </YAxis>
      <BarChart
        style={{ height: "50%" }}
        data={dailyStats}
        svg={{ fill }}
        contentInset={{ top: 32, bottom: 32, left: 16, right: 16 }}
        yMin={0}
      >
        <Grid />
      </BarChart>
      <XAxis 
        data={dailyStats}
        formatLabel={(value, index) => value}
        contentInset={{ left: 72, right: 72 }}
        svg={{ fontSize: 16, fill: "black" }}

      >
      </XAxis>
      <Text style={styles.stats}>{metricsCount}</Text>
      <Button onPress={goToHome} title="Home" />
    </View>
  );
};

export default SummaryScreen;
