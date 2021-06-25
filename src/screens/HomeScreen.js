import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert, Image } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import CardItem from "../components/CardItem";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  fabClean: {
    position: "absolute",
    margin: 32,
    left: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
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

  bgImageContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  bgImage: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    opacity: 0.2,
    marginBottom: 12,
  },

  bgImageCaption: {
    fontSize: 16,
    color: "#969696",
    marginBottom: 32.,
  },

  bgImageDesc: {
    fontSize: 14,
    color: "#969696",
  }

});

const db = SQLite.openDatabase("lifetracker.db");

const HomeScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [renderFlag, setRenderFlag] = useState(false);
  const image = require("../../assets/todo-icon.png");

  useEffect(() => {
    createDbTable();
  }, []);

  useEffect(() => {
    getAllItemsDb();
  }
  , [route.params]);

  useEffect(() => {
    getAllItemsDb();
    setRenderFlag(false);
  }
  , [renderFlag]
  );

  const onRefresh = () => {
    setRefresh(true);
    getAllItemsDb();
    setRefresh(false);
  }

  const createDbTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (item_id integer primary key not null, title text, target int, unit text);",
      [],
      () => console.log("ItemsDB is created")
      );

      tx.executeSql(
        "create table if not exists metrics (metric_id integer primary key not null, timestamp text, value int, item_id integer not null, foreign key(item_id) references items(item_id));",
      [],
      () => console.log("MetricsDB is created")
      );
    });
  };

  const getAllItemsDb = () => {
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

  const deleteDb = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from items", [], []);
      tx.executeSql("drop table items", [], []);
    });

    db.transaction((tx) => {
      tx.executeSql("delete from metrics", [], []);
      tx.executeSql("drop table metrics", [], []);
    });

    setItems([]);

    createDbTable();

    Alert.alert("Success", "DB is now recreated");
  };

  const goToAddEntry = () => {
    navigation.navigate("AddEntry");
  };

  const emptyLogo = () => {
    if (items.length == 0) {
      return (
        <View style={styles.bgImageContainer}>
          <Image source={image} style={styles.bgImage}/>
          <Text style={styles.bgImageCaption}>No items</Text>
          <Text style={styles.bgImageDesc}>Items you add will appear here.</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {emptyLogo()}
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
              <CardItem key={item.item_id} itemObject={item} navigation={navigation} route={route} setRenderFlag={setRenderFlag}/>
            );
          })}
        <View styles={{height: 64}}><Text style={{fontSize: 80}}></Text></View>
        </ScrollView>
      </View>
      {/* <FAB style={styles.fabClean} icon="trash-can-outline" onPress={deleteDb} /> */}
      <FAB style={styles.fab} icon="plus" onPress={goToAddEntry} />
    </View>
  );
};

export default HomeScreen;
