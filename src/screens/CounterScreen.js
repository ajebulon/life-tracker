import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { FAB, Button } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: "2%",
    backgroundColor: "#ffffff00",
  },

  fabRight: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  fabLeft: {
    position: "absolute",
    margin: 32,
    left: 0,
    bottom: 0,
  },

  deltaTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  deltaTitle: {
    fontSize: 32,
  },

  delta: {
    fontSize: 32,
    alignSelf: "center",
  },

  counter: {
    fontSize: 80,
    alignSelf: "center",
  },
});

const CounterScreen = ({ navigation, route }) => {
  const itemObject = route.params.itemObject;
  const [delta, setDelta] = useState(1);
  const [count, setCount] = useState(0);

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={{...styles.deltaTitleContainer, flex: 1, backgroundColor: "red" }}>
            <Text style={styles.deltaTitle}>Delta</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              keyboardType="numeric"
              value={delta.toString()}
              style={ styles.delta }
              onChangeText={(value) => {
                if (value.length == 0) {
                  setDelta(0);
                } else {
                  setDelta(parseInt(value));
                }
              }}
            />
          </View>
        </View>
        <View style={{ flex: 8, backgroundColor: "blue" }}>
          <TextInput
            keyboardType="numeric"
            value={count.toString()}
            style={{ ...styles.counter, flex: 5 }}
            onChangeText={(value) => {
              if (value.length == 0) {
                setCount(0);
              } else {
                setCount(parseInt(value));
              }
            }}
          />
        </View>
        <View
          style={{ flex: 3, flexDirection: "row", backgroundColor: "white" }}
        >
          <View style={{ flex: 1, backgroundColor: "green" }}></View>
          <View style={{ flex: 1, backgroundColor: "yellow" }}></View>
        </View>
        <View style={{ flex: 4, backgroundColor: "white" }}></View>
        <FAB
          style={styles.fabRight}
          icon="content-save"
          onPress={() => console.log("Saving data")}
        />
        <FAB style={styles.fabLeft} icon="home" onPress={goToHome} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CounterScreen;
