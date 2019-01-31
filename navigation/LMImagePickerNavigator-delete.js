import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LMImagePickerScreen from "../screens/LMImagePickerScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator({
  New: LMImagePickerScreen
});

LMImagePickerScreen.navigationOptions = {
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
  LMImagePickerStack
});
