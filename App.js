import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="hidden" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title: "Life Tracker"}}
          />
        <Stack.Screen 
          name="AddEntry" 
          component={AddEntryScreen} 
          options={{title: "New Entry"}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
