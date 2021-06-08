import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
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
  const itemObject = route.params.itemObject;

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemObject.title.toUpperCase()}</Text>
      <Text style={styles.stats}>{metricsCount}</Text>
      <Button onPress={goToHome} title="Home" />
    </View>
  );
};

export default SummaryScreen;
