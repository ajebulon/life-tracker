import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { FAB } from "react-native-paper";

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  deltaTitle: {
    fontSize: 32,
  },

  deltaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
          <View style={styles.deltaTitleContainer}>
            <Text style={styles.deltaTitle}>Delta</Text>
          </View>
          <View style={styles.deltaContainer}>
            <TextInput
              keyboardType="numeric"
              value={delta.toString()}
              style={styles.delta}
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
        <View
          style={{ flex: 8, backgroundColor: "#FFFFFF", flexDirection: "row" }}
        >
          <Pressable
            onPress={() => {
              if (count - delta < 0) {
                setCount(0);
              } else {
                setCount(count - delta);
              }
            }}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 80 }}>-</Text>
          </Pressable>

          <View style={{ flex: 3, justifyContent: "center" }}>
            <TextInput
              keyboardType="numeric"
              value={count.toString()}
              style={{ ...styles.counter }}
              onChangeText={(value) => {
                if (value.length == 0) {
                  setCount(0);
                } else if (parseInt(value) > 9999) {
                  setCount(9999);
                } else {
                  setCount(parseInt(value));
                }
              }}
            />
          </View>

          <Pressable
            onPress={() => {
              if (count + delta > 9999) {
                setCount(9999);
              } else {
                setCount(count + delta);
              }
            }}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 80 }}>+</Text>
          </Pressable>
        </View>

        <View style={{ flex: 2, backgroundColor: "#FFFFFF" }}></View>
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
