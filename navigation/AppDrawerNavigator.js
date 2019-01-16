import React, { Component } from "react";
import {
  // createStackNavigator,
  // createAppContainer,
  // createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import DashboardStackNavigator from "../navigation/DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

export default AppDrawerNavigator;
