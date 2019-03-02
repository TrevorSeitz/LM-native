import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
// import HomeScreen from "../../screens/HomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import AddLocationScreen from "../../screens/AddLocationScreen";
// import ListLocationsScreen from "../../screens/ListLocationsScreen";
// import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
// import EditLocationScreen from "../../screens/EditLocationScreen";
// import ProfileScreen from "../../screens/ProfileScreen";
// import LoginScreen from "../../screens/auth/LoginScreen";
// import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";
// import ImageBrowser from "../../screens/ImageBrowser";
// import AdditionalPhotosScreen from "../../screens/AdditionalPhotosScreen";
// import ImageTile from "../../screens/ImageTile";

// import AppNavigator from "../AppNavigator";
import AppDrawerNavigator from "../AppDrawerNavigator";
// import AddLocationNavigator from "../AddLocationNavigator";
// import ListLocationsNavigator from "../ListLocationsNavigator";

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
