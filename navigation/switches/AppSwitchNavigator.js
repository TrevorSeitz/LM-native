import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import HomeScreen from "../../screens/HomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import AddLocationScreen from "../../screens/AddLocationScreen";
import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
import EditLocationScreen from "../../screens/EditLocationScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";
import ImageBrowser from "../../screens/ImageBrowser";
import MultiLocationScreen from "../../screens/MultiLocationScreen";
import ImageTile from "../../screens/ImageTile";

import AppDrawerNavigator from "../AppDrawerNavigator";
import AddLocationNavigator from "../AddLocationNavigator";
import ListLocationsNavigator from "../ListLocationsNavigator";
// import LocationDetailsNavigator from "../LocationDetailsNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    Home: { screen: AppDrawerNavigator },
    NewLocation: { screen: AddLocationNavigator },
    ListLocations: { screen: ListLocationsNavigator },
    LocationDetails: { screen: LocationDetailsScreen },
    EditLocation: { screen: EditLocationScreen },
    Welcome: { screen: WelcomeScreen },
    Profile: { screen: ProfileScreen },
    MultiLocation: { screen: MultiLocationScreen },
    ImageBrowser: { screen: ImageBrowser },
    ImageTile: { screen: ImageTile },
    Loading: { screen: LoadingScreen }
  },
  {
    initialRouteName: "Loading"
  }
);

export default AppSwitchNavigator;
