import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import AddLocationScreen from "../../screens/AddLocationScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";

import AppDrawerNavigator from "../AppDrawerNavigator";
import DashboardStackNavigator from "../DashboardStackNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    WelcomeScreen: WelcomeScreen,
    Loading: LoadingScreen,
    Dashboard: AppDrawerNavigator,
  },
  {
    initialRouteName: "Loading"
  }
);

export default AppSwitchNavigator;
