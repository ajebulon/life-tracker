import React from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  logo: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },

  textUrl: {
    color: "#0000FF",
    fontSize: 20,
  },

  textUrlSmall: {
    color: "#0000FF",
    fontSize: 12,
  },
});

const AboutScreen = () => {
  const image = require("../../assets/life-tracker-icon.png");

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.logo}></Image>
      <Text style={{ marginBottom: 16, fontWeight: "bold"}}>
        If you have any feedback or inquiries, visit me at
      </Text>
      <Text
        style={styles.textUrl}
        onPress={() => Linking.openURL("https://github.com/ajebulon")}
      >
        My GitHub Profile
      </Text>

      <Text style={{ marginTop: 64, fontWeight: "bold" }}>
        Huge thanks to these websites for free assets
      </Text>
      <Text
        style={{ ...styles.textUrlSmall, marginTop: 16 }}
        onPress={() =>
          Linking.openURL("https://www.vecteezy.com/free-vector/checklist")
        }
      >
        Checklist Vectors by Vecteezy
      </Text>
      <Text
        style={{ ...styles.textUrlSmall, marginTop: 16 }}
        onPress={() => Linking.openURL("https://hatchful.shopify.com/")}
      >
        Free Logo Maker by Hatchful Shopify
      </Text>
    </View>
  );
};

export default AboutScreen;
