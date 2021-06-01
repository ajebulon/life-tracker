import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },
});

const HomeScreen = ({ navigation }) => {
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={() => navigation.navigate("Hello")}
    />
  );
};

export default HomeScreen;
