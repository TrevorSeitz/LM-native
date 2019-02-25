import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AddLocationScreen from "../screens/AddLocationScreen";

const HomeStack = createStackNavigator({
  New: AddLocationScreen
});

AddLocationScreen.navigationOptions = {
  tabBarLabel: "Add A New Location",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add${focused ? "" : ""}`
          : "md-add"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack
});
