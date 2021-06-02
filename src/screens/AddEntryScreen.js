import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

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

const AddEntryScreen = () => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
          style={styles.cardElem}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInput
            label="Target"
            value={target}
            onChangeText={(target) => setTarget(target)}
            style={{ ...styles.cardElem, marginEnd: "2.5%", width: "75%" }}
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
              style={{backgroundColor: "cyan", color: "red"}}
            />
            <Picker.Item 
              label="Week"
              value="week"
              style={{backgroundColor: "cyan", color: "red"}}
            />
          </Picker>
        </View>

        <View style={{ flex: 1 }}></View>

        <Button
          mode="contained"
          icon="content-save"
          onPress={() => {
            console.log(title + " target is " + target + " per " + unit);
          }}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default AddEntryScreen;
