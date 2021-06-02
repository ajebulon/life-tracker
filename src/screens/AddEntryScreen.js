import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
        
        <View style={{flex: 1, flexDirection: "row"}}>
          <View style={{flex: 2}}>
            <TextInput
              label="Target"
              value={target}
              onChangeText={(target) => setTarget(target)}
              style={styles.cardElem}
            />
          </View>
          <View style={{flex: 1}}>
            <TextInput
              label="Target2"
              value={target}
              onChangeText={(target) => setTarget(target)}
              style={styles.cardElem}
            />
          </View>
        </View>

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
