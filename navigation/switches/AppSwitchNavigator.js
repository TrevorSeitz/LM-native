import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";

import AppDrawerNavigator from "../AppDrawerNavigator";

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

export default AppSwitchNavigator;
