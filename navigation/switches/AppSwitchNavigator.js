import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import HomeScreen from "../../screens/HomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import AddLocationScreen from "../../screens/AddLocationScreen";
import ListLocationsScreen from "../../screens/ListLocationsScreen";
import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
import EditLocationScreen from "../../screens/EditLocationScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";
import ImageBrowser from "../../screens/ImageBrowser";
import AdditionalPhotosScreen from "../../screens/AdditionalPhotosScreen";
// import MultiLocationScreen from "../../screens/MultiLocationScreen";
import ImageTile from "../../screens/ImageTile";

import AppDrawerNavigator from "../AppDrawerNavigator";
import AddLocationNavigator from "../AddLocationNavigator";
import ListLocationsNavigator from "../ListLocationsNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Home: AppDrawerNavigator,
    AddLocation: AddLocationScreen,
    // NewLocation: AddLocationNavigator,
    // ListLocations: ListLocationsNavigator,
    ListLocations: ListLocationsScreen,
    LocationDetails: LocationDetailsScreen,
    EditLocation: EditLocationScreen,
    Profile: ProfileScreen,
    ImageBrowser: ImageBrowser,
    AdditionalPhotos: AdditionalPhotosScreen,
    ImageTile: ImageTile,
    Loading: LoadingScreen
  },
  {
    initialRouteName: "Loading"
  }
);

export default AppSwitchNavigator;
