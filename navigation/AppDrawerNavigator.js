import React, { Component } from "react";
import {
  createDrawerNavigator
  // createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import WelcomeScreen from "../screens/WelcomeScreen";
import DashboardScreen from "../screens/DashboardScreen";
import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LogoutScreen from "../screens/auth/LogoutScreen";

import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Home: {
    screen: HomeScreen
  },
  AddLocation: {
    screen: AddLocationScreen
  },
  ListLocations: {
    screen: ListLocationsScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Logout: {
    screen: LogoutScreen
  }
});

export default AppDrawerNavigator;
