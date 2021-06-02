import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

const HomeScreen = ({ navigation }) => {  
  const onPressHandler = () => {
    navigation.navigate("AddEntry");
  };

  return (
    <View style={styles.container}>      
      <FAB style={styles.fab} icon="plus" onPress={onPressHandler} />
    </View>
  );
};

export default HomeScreen;
