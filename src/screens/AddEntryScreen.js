import React, { useState } from "react";
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
    margin: "5%",
    backgroundColor: "#ffffff00",
  },

  cardElem: {
    marginTop: "2.5%",
    marginBottom: "2.5%",
    backgroundColor: "#ffffff00",
  },
});

const AddEntryScreen = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState("day");

  const saveData = () => {
    if (title.length > 0) {
      Alert.alert("Success", "" + title + " target is " + target + " per " + unit);
      navigation.navigate("Home");
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
              setTarget(parseInt(target));
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
            <Picker.Item
              label="Day"
              value="day"
            />
            <Picker.Item
              label="Week"
              value="week"
            />
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
