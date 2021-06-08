import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    alignSelf: "center",
  },

  caption: {
    margin: 32,
    fontSize: 24,
  },
});

const CounterScreen = ({ navigation, route }) => {
  const itemObject = route.params.itemObject;

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter Screen</Text>
      <Text style={styles.caption}>For {itemObject.title.toUpperCase()}</Text>
      <Button onPress={goToHome} title="Home" />
    </View>
  );
};

export default CounterScreen;
