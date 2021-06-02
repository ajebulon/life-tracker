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
  const onPressHandler = () => {
    navigation.navigate("Hello");
  }

  return (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={onPressHandler}
    />
  );
};

export default HomeScreen;
