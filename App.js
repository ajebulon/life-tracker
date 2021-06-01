import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "./src/screens/HomeScreen";
import { HelloScreen } from "./src/screens/HelloScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <View>
      <HelloScreen></HelloScreen>
    </View>
  );
};

export default App;
