import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Text } from "react-native-paper";

const styles = StyleSheet.create({
  itemButton: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 20,
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
  const itemObject = props.itemObject;
  return (
    <Card mode="outlined">
      <Card.Content>
        <Title>
          {itemObject.id}. {itemObject.title}
        </Title>
        <Paragraph>
          Your target is {itemObject.target} per {itemObject.unit}. Keep working on it!
        </Paragraph>
        <Text style={styles.dailyStatsTitle}>Daily Stats</Text>
        <Text style={styles.dailyStats}>{itemObject.target/2}</Text>
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
