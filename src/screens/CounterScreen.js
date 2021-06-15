import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: "2%",
    backgroundColor: "#FFFFFF",
  },

  fabRight: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  fabLeft: {
    position: "absolute",
    margin: 32,
    left: 0,
    bottom: 0,
  },

  deltaTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  deltaTitle: {
    fontSize: 32,
  },

  deltaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  delta: {
    fontSize: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  counter: {
    fontSize: 80,
    alignSelf: "center",
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const CounterScreen = ({ navigation, route }) => {
  const itemObject = route.params.itemObject;
  const [delta, setDelta] = useState(1);
  const [count, setCount] = useState(0);

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const addNewMetricsDb = () => {
    const item_id = itemObject.item_id;

    if (count > 0) {
      db.transaction((tx) => {
        tx.executeSql(
          "insert into metrics (timestamp, value, item_id) values (datetime('now'), ?, ?)",
          [count, item_id],
          [],
          (_, error) => {
            console.log(error);
          }
        );
        // tx.executeSql("select * from metrics", [], (_, { rows }) => {
        //   console.log(JSON.stringify(rows));
        // });
      });
      navigation.navigate("Home", {newCounterFlag: count});
    } else {
      goToHome();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={styles.deltaTitleContainer}>
            <Text style={styles.deltaTitle}>+</Text>
          </View>
          <View style={styles.deltaContainer}>
            <TextInput
              keyboardType="numeric"
              value={delta.toString()}
              style={styles.delta}
              onChangeText={(value) => {
                if (value.length == 0) {
                  setDelta(0);
                } else {
                  setDelta(parseInt(value));
                }
              }}
            />
          </View>
        </View>
        <View
          style={{ flex: 8, backgroundColor: "#FFFFFF", flexDirection: "row" }}
        >
          <Pressable
            onPress={() => {
              if (count - delta < 0) {
                setCount(0);
              } else {
                setCount(count - delta);
              }
            }}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 80 }}>-</Text>
          </Pressable>

          <View style={{ flex: 3, justifyContent: "center" }}>
            <TextInput
              keyboardType="numeric"
              value={count.toString()}
              style={{ ...styles.counter }}
              onChangeText={(value) => {
                if (value.length == 0) {
                  setCount(0);
                } else if (parseInt(value) > 9999) {
                  setCount(9999);
                } else {
                  setCount(parseInt(value));
                }
              }}
            />
          </View>

          <Pressable
            onPress={() => {
              if (count + delta > 9999) {
                setCount(9999);
              } else {
                setCount(count + delta);
              }
            }}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 80 }}>+</Text>
          </Pressable>
        </View>

        <View style={{ flex: 2, backgroundColor: "#FFFFFF" }}></View>
        <FAB
          style={styles.fabRight}
          icon="content-save"
          onPress={addNewMetricsDb}
        />
        <FAB style={styles.fabLeft} icon="home" onPress={goToHome} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CounterScreen;
