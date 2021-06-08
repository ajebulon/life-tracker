import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import StylishButton from "../components/StylishButton";
import CardItem from "../components/CardItem";

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
    margin: "2%",
    backgroundColor: "#ffffff00",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    margin: 32,
    bottom: 0,
  },

  text: {
    fontSize: 32,
    margin: 10,
    fontStyle: "italic",
  },
});

const db = SQLite.openDatabase("lifetracker.db");

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
    getItemsFromDb();
  }, [route.params]);

  const onRefresh = () => {
    setRefresh(true);
    getItemsFromDb();
    setRefresh(false);
  }

  const createDbTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "\
          create table if not exists items (item_id integer primary key not null, title text, target int, unit text); \
          create table if not exists metrics (metric_id integer primary key not null, added date, value int, item_id integer not null, foreign key (item_id) references items (item_id));\
        "
      // [],
      // () => console.log("DB is created")
      );
    });
  };

  const getItemsFromDb = () => {
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

  const deleteAllItems = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from items", [], []);
    });

    setItems([]);
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
              <CardItem key={item.item_id} itemObject={item}/>
            );
          })}
        <View styles={{height: 64}}><Text style={{fontSize: 80}}></Text></View>
        </ScrollView>
      </View>
      <View style={styles.button}>
        <StylishButton icon="trash-can" label="Clean" onPressHandler={deleteAllItems} />
      </View>
      <FAB style={styles.fab} icon="plus" onPress={onPressHandler} />
    </View>
  );
};

export default HomeScreen;
