import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import WelcomeScreen from "./screens/WelcomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";
import DetailsScreen from "./screens/DetailsScreen";

// import AppDrawerNavigator from "./navigation/AppDrawerNavigator";

export default class App extends React.Component {
  state = { switchValue: false };

  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
