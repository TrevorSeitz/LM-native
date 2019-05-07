import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
// Screens
import LogoutScreen from "../screens/auth/LogoutScreen";
// Navigators
import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  // this creates the menu for the drawer
  Dashboard: DashboardStackNavigator,
  Logout: LogoutScreen
});

export default AppDrawerNavigator;
