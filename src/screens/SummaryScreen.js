import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text as TextRN } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import { BarChart, Grid, XAxis } from "react-native-svg-charts";
import { Text, LinearGradient, Line, Stop, Defs } from "react-native-svg";
import { scaleBand } from "d3-scale";

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
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [graphCutoff, setGraphCutoff] = useState(0);
  const [graphMaxElem, setGraphMaxElem] = useState(0);

  const itemObject = route.params.itemObject;
  const dailyTarget = (itemObject.unit === "day") ? itemObject.target : Math.ceil(itemObject.target / 7);

  useEffect(() => {
    getDailyArray();
  }, []);

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const getLastWeekDates = () => {
    const refDate = new Date();
    var lastWeekDates = [];

    var lastWeekDate;
    const tzoneOffset = refDate.getTimezoneOffset() / 60;
    for (let i = -6; i <= 0; i++) {
      lastWeekDate = new Date();
      lastWeekDate.setDate(refDate.getDate() + i);
      lastWeekDate.setUTCHours(lastWeekDate.getUTCHours() - tzoneOffset);
      lastWeekDates.push(lastWeekDate.toISOString());
    }
    return lastWeekDates;
  };

  const getCleanDate = (dateString) => {
    const day = parseInt(dateString.slice(8, 10));
    const mon = parseInt(dateString.slice(5, 7));
    return mon.toString() + "/" + day.toString();
  };

  const getDailyArray = () => {
    const item_id = itemObject.item_id;

    db.transaction((tx) => {
      tx.executeSql(
        "select *, datetime(timestamp,'localtime') as timestamp from metrics where timestamp > date('now','-7 days') and item_id=?",
        [item_id],
        (_, { rows }) => {
          const lastWeekDates = getLastWeekDates();
          const lastWeekDailyStats = new Array(7).fill(0);

          /* For each found entry */
          for (let i = 0; i < rows.length; i++) {
            for (let dateIdx = 0; dateIdx < lastWeekDates.length; dateIdx++) {
              /* Find corresponding date */
              if (
                lastWeekDates[dateIdx].includes(
                  rows.item(i).timestamp.slice(0, 10)
                ) > 0
              ) {
                /* Update the value */
                lastWeekDailyStats[dateIdx] += rows.item(i).value;
                break;
              }
            }
          }

          var tempElem;
          var tempList = [];
          for (let i = 0; i < lastWeekDailyStats.length; i++) {
            tempElem = {};
            tempElem["date"] = getCleanDate(lastWeekDates[i]);
            tempElem["stats"] = lastWeekDailyStats[i];
            tempList.push(tempElem);
          }
          setWeeklyStats(tempList);

          setGraphCutoff(Math.max(...lastWeekDailyStats) * 0.8);
          setGraphMaxElem(() => {
            if (Math.max(...lastWeekDailyStats) < dailyTarget) {
              return dailyTarget;
            } else {
              return Math.max(...lastWeekDailyStats);
            }
          });
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
        y={value.stats < CUT_OFF ? y(value.stats) - 10 : y(value.stats) + 15}
        fontSize={16}
        fill={value.stats >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value.stats}
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

  const HorizontalLine = ({ y }) => (
    <Line
      key={"zero-axis"}
      x1={"0%"}
      x2={"100%"}
      y1={y(dailyTarget)}
      y2={y(dailyTarget)}
      stroke={"grey"}
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
  );

  return (
    <View style={styles.container}>
      <TextRN style={styles.title}>
        {itemObject.title.charAt(0).toUpperCase() + itemObject.title.slice(1)}
      </TextRN>
      <View
        style={{
          height: "50%",
          paddingVertical: 16,
        }}
      >
        <BarChart
          style={{ flex: 1 }}
          data={weeklyStats}
          yAccessor={({ item }) => item.stats}
          xAccessor={({ item }) => item.date}
          svg={{ fill: "url(#gradient)" }}
          contentInset={{ top: 10, bottom: 10 }}
          spacingOuter={0.2}
          spacingInner={0.2}
          gridMin={0}
          gridMax={graphMaxElem}
          numberOfTicks={10}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Gradient />
          <Labels />
          <HorizontalLine />
        </BarChart>
        <XAxis
          style={{ marginTop: 10 }}
          data={weeklyStats}
          scale={scaleBand}
          xAccessor={({ item }) => item.date}
          formatLabel={(value, index) => {
            return index < 6 ? value : "Today";
          }}
          svg={{ fontSize: 14, fill: "black" }}
        />
      </View>
      {/* <FAB style={styles.fabLeft} icon="home" onPress={goToHome} /> */}
    </View>
  );
};

export default SummaryScreen;
