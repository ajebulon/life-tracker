import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  // CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { Appbar } from "react-native-paper";

import HomeScreen from "./src/screens/HomeScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import SummaryScreen from "./src/screens/SummaryScreen";
import CounterScreen from "./src/screens/CounterScreen";

const Stack = createStackNavigator();

const CustomNavigationBar = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title}/>
    </Appbar.Header>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="hidden" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          header: (props) => <CustomNavigationBar {...props} />
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{headerTitle: "Life Tracker"}}
          />
        <Stack.Screen 
          name="AddEntry" 
          component={AddEntryScreen} 
          options={{headerTitle: "New Item"}}
          />
        <Stack.Screen 
          name="Summary" 
          component={SummaryScreen} 
          options={{headerTitle: "Summary"}}
          />
        <Stack.Screen 
          name="Counter" 
          component={CounterScreen} 
          options={({ route }) => ({ headerTitle: "Counter for " + route.params.itemObject.title.charAt(0).toUpperCase() + route.params.itemObject.title.slice(1)})}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
