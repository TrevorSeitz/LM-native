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
<<<<<<< HEAD
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
// import MultiLocationScreen from "../screens/MultiLocationScreen";
=======
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7
import ProfileScreen from "../screens/ProfileScreen";
import LogoutScreen from "../screens/auth/LogoutScreen";

import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
<<<<<<< HEAD
  Dashboard: DashboardStackNavigator,
  Home: HomeScreen,
  "Add New Location": AddLocationScreen,
  "List All Locations": ListLocationsScreen,
  Profile: ProfileScreen,
  Logout: LogoutScreen,
=======
  // This is the list for the Drawer Navigator
  Dashboard: DashboardStackNavigator,

  Home: HomeScreen,

  AddLocation: AddLocationScreen,

  ListLocations: ListLocationsScreen,

  Profile: ProfileScreen,

  Logout: LogoutScreen,

>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7
});

export default AppDrawerNavigator;
