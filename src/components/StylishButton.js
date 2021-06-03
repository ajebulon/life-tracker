import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  button: {
    borderRadius:20,
    height: 40,
    justifyContent: "center",
  },
});

const StylishButton = (props) => {
  return (
    <Button
      mode="contained"
      icon={props.icon}
      onPress={props.onPressHandler}
      style={styles.button}
    >{props.label}</Button>
  );
};

export default StylishButton;
