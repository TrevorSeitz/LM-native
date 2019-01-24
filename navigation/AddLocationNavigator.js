import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
// import WelcomeScreen from "../../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import AddLocationStack from "../stacks/AddLocationStack";

const HomeStack = createStackNavigator({
  New: AddLocationScreen
});

AddLocationScreen.navigationOptions = {
  tabBarLabel: "Add A New Place",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  AddLocationStack
});
