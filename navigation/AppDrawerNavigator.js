import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LogoutScreen from "../screens/auth/LogoutScreen";
import DashboardStackNavigator from "./DashboardStackNavigator";

const AppDrawerNavigator = createDrawerNavigator({
  // this creates the menu for the drawer
  Dashboard: DashboardStackNavigator,
  Logout: LogoutScreen
});

export default AppDrawerNavigator;
