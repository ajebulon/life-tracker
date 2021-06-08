import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SummaryScreen = ({ navigation, route }) => {
  
  const itemObject = route.params.itemObject;
  
  const goToHome = () => {
    navigation.navigate("Home");
  };
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{itemObject.item_id}. {itemObject.title}</Text>
      <Button onPress={goToHome} title="Home"/>
    </View>
  );
};

export default SummaryScreen;
