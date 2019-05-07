import React from "react";
import { createSwitchNavigator } from "react-navigation";
// Screens
import WelcomeScreen from "../../screens/WelcomeScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";
// Nvigators
import AppDrawerNavigator from "../AppDrawerNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    WelcomeScreen: WelcomeScreen,
    Loading: LoadingScreen,
    Dashboard: AppDrawerNavigator
  },
  {
    initialRouteName: "Loading"
  }
);

export default AppSwitchNavigator;
