import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Text } from "react-native-paper";

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

  dailyStatsTitle: {
    marginTop: 32,
    fontSize: 20,
    alignSelf: "center",
  },

  dailyStats: {
    marginBottom: 32,
    fontSize: 64,
    alignSelf: "center",
  },
});

const CardItem = (props) => {
  return (
    <Card mode="outlined">
      <Card.Content>
        <Title>
          {props.id}. {props.title}
        </Title>
        <Paragraph>
          Your target is {props.target} per {props.unit}. Keep working on it!
        </Paragraph>
        <Text style={styles.dailyStatsTitle}>Daily Achievement</Text>
        <Text style={styles.dailyStats}>{props.target/2}</Text>
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
