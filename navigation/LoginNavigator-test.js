import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginScreen.navigationOptions = {
  tabBarLabel: "Login",
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
  AdditionalPhotosStack,
  LoginStack
});
