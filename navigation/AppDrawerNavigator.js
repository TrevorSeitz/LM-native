import React, { Component } from "react";
import {
  createDrawerNavigator
  // createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import {Ionicons} from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import LogoutScreen from "../screens/auth/LogoutScreen";


import AddLocationStack from "../stacks/AddLocationStack"

import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  // this creates the menu for the drawer
  Dashboard: DashboardStackNavigator,
  // Profile: ProfileScreen,
  Logout: LogoutScreen,
});

export default AppDrawerNavigator;
