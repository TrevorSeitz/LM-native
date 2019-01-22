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
import CurrentLocationScreen from "../screens/CurrentLocationScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import TestScreen from "../screens/TestScreen";
import LMImagePickerScreen from "../screens/LMImagePickerScreen";

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
  // CurrentLocation: {
  //   screen: CurrentLocationScreen
  // },
  Test: {
    screen: TestScreen
  },
  LMImagePicker: {
    screen: LMImagePickerScreen
  }
});

export default AppDrawerNavigator;
