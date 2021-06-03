import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import * as SQLite from "expo-sqlite";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

const db = SQLite.openDatabase("trackedItems.db");

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    createDbTable();
  });

  const createDbTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, title text, target int, unit text);'
      );
    }, [], () => console.log("DB is created"));
  }

  const onPressHandler = () => {
    navigation.navigate("AddEntry");
  };

  return (
    <View style={styles.container}>      
      <FAB style={styles.fab} icon="plus" onPress={onPressHandler} />
    </View>
  );
};

export default HomeScreen;
