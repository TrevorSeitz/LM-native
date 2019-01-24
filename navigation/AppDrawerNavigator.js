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
// import TestScreen from "../screens/TestScreen";
// import LMImagePickerScreen from "../screens/LMImagePickerScreen";

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
    // },
    // Test: {
    //   screen: TestScreen
    // },
    // LMImagePicker: {
    //   screen: LMImagePickerScreen
  }
});

export default AppDrawerNavigator;
