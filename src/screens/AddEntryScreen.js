import React, { useState, useEffect } from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as SQLite from "expo-sqlite";

import StylishButton from "../components/StylishButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },

  containerCard: {
    margin: "2%",
    backgroundColor: "#ffffff00",
  },

  cardElem: {
    marginTop: "2.5%",
    marginBottom: "2.5%",
    backgroundColor: "#ffffff00",
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const AddEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("day");

  useEffect(() => {
    createDbTable();
  });

  const createDbTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "\
          create table if not exists items (item_id integer primary key not null, title text, target int, unit text); \
          create table if not exists metrics (metric_id integer primary key not null, added date, value int, item_id integer not null, foreign key (item_id) references items (item_id));\
        "
      );
    });
  };

  const storeItemToDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into items (title, target, unit) values (?, ?, ?)",
        [title, target, unit]
      );
      tx.executeSql("select * from items", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
      });
    });
  };

  const saveData = () => {
    if (title.length > 0) {
      Alert.alert(
        "Success",
        "" + title + " target is " + target + " per " + unit
      );
      storeItemToDb();
      navigation.navigate("Home", {updateFlag: true});
    } else {
      Alert.alert("Error", "Please insert title name");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
          style={styles.cardElem}
          onSubmitEditing={Keyboard.dismiss}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInput
            label="Target"
            value={target.toString()}
            onChangeText={(target) => {
              if (target.length == 0) {
                setTarget(0);
              } else {
                setTarget(parseInt(target));
              }
            }}
            style={{ ...styles.cardElem, marginEnd: "2.5%", width: "75%" }}
            keyboardType="numeric"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue)}
            style={{ ...styles.cardElem, marginEnd: "2.5%", width: "25%" }}
            mode="dropdown"
          >
            <Picker.Item label="Day" value="day" />
            <Picker.Item label="Week" value="week" />
          </Picker>
        </View>

        <View style={{ flex: 1 }}></View>

        <StylishButton
          label="Save"
          icon="content-save"
          onPressHandler={saveData}
        />
      </View>
    </View>
  );
};

export default AddEntryScreen;
