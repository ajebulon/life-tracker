import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text as TextRN } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import { BarChart, Grid } from "react-native-svg-charts";
import { Text, LinearGradient, Stop, Defs } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: "2%",
    backgroundColor: "#FFFFFF",
  },

  title: {
    marginTop: "10%",
    marginBottom: "10%",
    fontSize: 24,
    alignSelf: "center",
  },

  stats: {
    fontSize: 64,
    marginBottom: 64,
    alignSelf: "center",
  },

  fabLeft: {
    position: "absolute",
    margin: 32,
    left: 0,
    bottom: 0,
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const SummaryScreen = ({ navigation, route }) => {
  const [metricsCount, setMetricsCount] = useState(0);
  const [dailyStats, setDailyStats] = useState([]);
  const [dateStats, setDateStats] = useState([]);
  const [graphCutoff, setGraphCutoff] = useState(0);

  const itemObject = route.params.itemObject;

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

  const goToGraph = () => {
    navigation.navigate("Graph");
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

          // /* Remove first zero values (non-existing data) */
          // var cleanDailyStats = [];
          // var cleanFlag = false;
          // var cleanDates = [];

          // for (let i = 0; i < lastWeekDailyStats.length; i++) {
          //   if (lastWeekDailyStats[i] > 0 || cleanFlag) {
          //     cleanFlag = true;
          //     cleanDailyStats.push(lastWeekDailyStats[i]);
          //     cleanDates.push(lastWeekDates[i]);
          //   }
          // }

          setDailyStats(lastWeekDailyStats);
          setDateStats(lastWeekDates);
          setGraphCutoff(Math.max(...lastWeekDailyStats) * 0.8);
        }
      );
    });
  };

  const CUT_OFF = graphCutoff;
  const Labels = ({ x, y, bandwidth, data }) =>
    data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={16}
        fill={value >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value}
      </Text>
    ));

  const Gradient = () => (
    <Defs key={"gradient"}>
      <LinearGradient id={"gradient"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"#6200EE"} />
        <Stop offset={"100%"} stopColor={"#00DAC4"} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View style={styles.container}>
      <TextRN style={styles.title}>{itemObject.title.charAt(0).toUpperCase() + itemObject.title.slice(1)}</TextRN>
      <View
        style={{ flexDirection: "row", height: "50%", paddingVertical: 16 }}
      >
        <BarChart
          style={{ flex: 1 }}
          data={dailyStats}
          svg={{ fill: "url(#gradient)" }}
          contentInset={{ top: 10, bottom: 10 }}
          spacingOuter={0.2}
          spacingInner={0.2}
          gridMin={0}
          numberOfTicks={10}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Gradient />
          <Labels />
        </BarChart>
      </View>
      {/* <Button onPress={goToHome} title="Home" /> */}
      <FAB style={styles.fabLeft} icon="home" onPress={goToHome} />
    </View>
  );
};

export default SummaryScreen;
