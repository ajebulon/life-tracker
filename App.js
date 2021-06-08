import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import SummaryScreen from "./src/screens/SummaryScreen";

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
        <Stack.Screen 
          name="Summary" 
          component={SummaryScreen} 
          options={{title: "Summary"}}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
