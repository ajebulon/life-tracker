import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  }
});

const AddEntryScreen = () => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
          style={styles.cardElem}
        />
        
        <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
          <TextInput
            label="Target"
            value={target}
            onChangeText={(target) => setTarget(target)}
            style={{...styles.cardElem, marginEnd: "2.5%", width: "50%"}}
          />
          <TextInput
            label="Target2"
            value={target}
            onChangeText={(target) => setTarget(target)}
            style={{...styles.cardElem, marginStart: "2.5%", width: "50%"}}
          />
        </View>
        
        <View style={{flex: 1}}></View>

        <Button
          mode="contained"
          icon="content-save"
          onPress={() => {
            console.log(title + " target is " + target);
          }}
        >
          Save
        </Button>

      </View>
    </View>
  );
};

export default AddEntryScreen;
