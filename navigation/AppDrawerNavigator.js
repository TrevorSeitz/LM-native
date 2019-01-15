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

import DashboardScreen from "../screens/DashboardScreen";
import HomeScreen from "../screens/HomeScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import DetailsScreen from "../screens/DetailsScreen";

import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Home: {
    screen: HomeScreen
  },
  NewPlace: {
    screen: NewPlaceScreen
  },
  Details: {
    screen: DetailsScreen
  }
});

export default AppDrawerNavigator;
