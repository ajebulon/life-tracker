import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import StylishButton from "../components/StylishButton";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
    flexDirection: "column",
  },

  containerCard: {
    margin: "5%",
    backgroundColor: "#ffffff00",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    margin: 32,
    bottom: 0,
  },

  item: {
    marginBottom: "5%",
    backgroundColor: "#4ae1fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },

  text: {
    fontSize: 32,
    margin: 10,
    fontStyle: "italic",
  },
});

const db = SQLite.openDatabase("trackedItems.db");

const Item = ({ props }) => {
  return (
    <Text>
      {props.title} target is {props.target} per {props.unit}
    </Text>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    createDbTable();
    getEntriesFromDb();
  }, [route.params]);

  const onRefresh = () => {
    setRefresh(true);
    getEntriesFromDb();
    setRefresh(false);
  }

  const createDbTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists items (id integer primary key not null, title text, target int, unit text);"
        );
      }
      // [],
      // () => console.log("DB is created")
    );
  };

  const getEntriesFromDb = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from items", [], (_, { rows }) => {
        var thisItem;
        var temp = [];
        for (let i = 0; i < rows.length; i++) {
          thisItem = rows.item(i);
          temp.push(thisItem);
        }
        setItems(temp);
      });
    });
  };

  const deleteAllEntries = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from items", [], []);
    });

    setItems([]);
  };

  const testHandler = () => {
    console.log("Test DB");
  };

  const onPressHandler = () => {
    navigation.navigate("AddEntry");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        >
          {items.map((item) => {
            return (
              <View style={styles.item} key={item.id}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <StylishButton icon="trash-can" label="Clean" onPressHandler={deleteAllEntries} />
      </View>
      <FAB style={styles.fab} icon="plus" onPress={onPressHandler} />
    </View>
  );
};

export default HomeScreen;
