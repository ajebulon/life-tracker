import React from "react";
import { Image, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, View, Text } from "react-native-paper";
import StylishButton from "../components/StylishButton";

const styles = StyleSheet.create({
  itemButton: {
    flex: 1,
    margin: 5,
    borderRadius: 20,
  },

  thumbnail: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },

  dailyStats: {
    margin: 10,
    fontSize: 64,
    alignSelf: "center",
  }
});

const CardItem = () => {
  return (
    <Card mode="outlined">
      <Card.Content>
        <Title>1. This is the title of the card</Title>
        <Paragraph>
          This is supposed to be the card content described as a paragraph. I
          just want to make sure that multiple-line usage is supported in this
          Card from react-native-paper
        </Paragraph>
        <Image
          style={styles.thumbnail}
          source={{
            uri: "https://image.similarpng.com/thumbnail/2020/08/Digital-camera-Premium-Vector-PNG.png",
          }}
        />
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-evenly" }}>
        <Button mode="contained" style={styles.itemButton}>
          Plus
        </Button>
        <Button mode="contained" style={styles.itemButton}>
          Summary
        </Button>
        <Button mode="contained" style={styles.itemButton}>
          Counter
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardItem;
