import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
// import HomeScreen from "../../screens/HomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
<<<<<<< HEAD
import AddLocationScreen from "../../screens/AddLocationScreen";
// import ListLocationsScreen from "../../screens/ListLocationsScreen";
import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
import EditLocationScreen from "../../screens/EditLocationScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
=======
// import AddLocationScreen from "../../screens/AddLocationScreen";
// import ListLocationsScreen from "../../screens/ListLocationsScreen";
// import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
// import EditLocationScreen from "../../screens/EditLocationScreen";
// import ProfileScreen from "../../screens/ProfileScreen";
// import LoginScreen from "../../screens/auth/LoginScreen";
// import SignupScreen from "../../screens/auth/SignupScreen";
// import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7
import LoadingScreen from "../../screens/auth/LoadingScreen";
// import ImageBrowser from "../../screens/ImageBrowser";
// import AdditionalPhotosScreen from "../../screens/AdditionalPhotosScreen";
// import MultiLocationScreen from "../../screens/MultiLocationScreen";
// import ImageTile from "../../screens/ImageTile";

import AppDrawerNavigator from "../AppDrawerNavigator";
<<<<<<< HEAD
import AddLocationNavigator from "../AddLocationNavigator";
import ListLocationsNavigator from "../ListLocationsNavigator";
// import LocationDetailsNavigator from "../LocationDetailsNavigator";
// import LocationDetailsNavigator from "../LocationDetailsNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    Home: { screen: AppDrawerNavigator },
    NewLocation: { screen: AddLocationNavigator },
    ListLocations: { screen: ListLocationsNavigator },
    // LocationDetails: { screen: LocationDetailsNavigator},
    // NewLocation: { screen: AddLocationScreen },
    // ListLocations: { screen: ListLocationsScreen },
    LocationDetails: { screen: LocationDetailsScreen},
    EditLocation: { screen: EditLocationScreen },
    Welcome: { screen: WelcomeScreen },
    Profile: { screen: ProfileScreen },
    ImageBrowser: { screen: ImageBrowser },
    AdditionalPhotos: { screen: AdditionalPhotosScreen },
    ImageTile: { screen: ImageTile },
    Loading: { screen: LoadingScreen }
=======
// import AddLocationNavigator from "../AddLocationNavigator";
// import ListLocationsNavigator from "../ListLocationsNavigator";

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    // Home: AppDrawerNavigator,
    // AddLocation: AddLocationScreen,
    // // NewLocation: AddLocationNavigator,
    // // ListLocations: ListLocationsNavigator,
    // ListLocations: ListLocationsScreen,
    // LocationDetails: LocationDetailsScreen,
    // EditLocation: EditLocationScreen,
    // Profile: ProfileScreen,
    // ImageBrowser: ImageBrowser,
    // AdditionalPhotos: AdditionalPhotosScreen,
    // ImageTile: ImageTile,
    Dashboard: AppDrawerNavigator,
    Loading: LoadingScreen
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7
  },
  {
    initialRouteName: "Loading"
  }
);

export default AppSwitchNavigator;
