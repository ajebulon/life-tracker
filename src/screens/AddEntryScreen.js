import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, FAB } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as SQLite from "expo-sqlite";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    // justifyContent: "center",
    alignSelf: "center",
  },

  containerCard: {
    margin: "5%",
    backgroundColor: "#ffffff00",
  },

  cardElem: {
    marginBottom: "5%",
    backgroundColor: "#ffffff00",
  },

  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },
});

const db = SQLite.openDatabase("lifetracker.db");

const AddEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("day");

  const addNewItemsDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into items (title, target, unit) values (?, ?, ?)",
        [title, target, unit]
      );
      // tx.executeSql("select * from items", [], (_, { rows }) => {
      //   console.log(JSON.stringify(rows));
      // });
    });
  };

  const saveData = () => {
    if (title.length > 0) {
      addNewItemsDb();
      navigation.navigate("Home", { updateFlag: true });
    } else {
      Alert.alert("Error", "Please insert title name");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.containerCard}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={styles.cardElem}
          />

          <View style={{ ...styles.cardElem, flexDirection: "row" }}>
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
        </View>
        <FAB style={styles.fab} icon="content-save" onPress={saveData} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddEntryScreen;
