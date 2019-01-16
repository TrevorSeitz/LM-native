import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import NewPlaceScreen from "../../screens/NewPlaceScreen";
// import ImagePickerScreen from "../../screens/ImagePickerScreen";

import AppDrawerNavigator from "../AppDrawerNavigator";

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator },
  NewPlace: { screen: AppDrawerNavigator }
  // ImapgePicker: { screen: ImagePickerScreen }
});

export default AppSwitchNavigator;
