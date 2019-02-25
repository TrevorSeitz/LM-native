import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const SignupStack = createStackNavigator({
  Signup: SignupScreen
});

SignupScreen.navigationOptions = {
  tabBarLabel: "Signup",
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
  ListLocationsStack,
  LocationDetailsStack,
  SignupStack
});
