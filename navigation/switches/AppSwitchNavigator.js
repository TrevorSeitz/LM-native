import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import HomeScreen from "../../screens/HomeScreen";
import DashboardScreen from "../../screens/DashboardScreen";
import NewPlaceScreen from "../../screens/NewPlaceScreen";
import AddLocationScreen from "../../screens/AddLocationScreen";
import LocationDetailsScreen from "../../screens/LocationDetailsScreen";
// import ListLocationsScreen from "../../screens/ListLocationsScreen";

import AppDrawerNavigator from "../AppDrawerNavigator";
import AddLocationNavigator from "../AddLocationNavigator";
import ListLocationsNavigator from "../ListLocationsNavigator";

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Home: { screen: HomeScreen },
  NewLocation: { screen: AddLocationNavigator },
  ListLocations: { screen: ListLocationsNavigator },
  LocationDetails: { screen: AppDrawerNavigator }
});

export default AppSwitchNavigator;
