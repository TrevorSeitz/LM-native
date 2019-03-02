import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";

import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AdditionalPhotosTile from "../screens/AdditionalPhotosTile";
import ImageBrowser from "../screens/ImageBrowser";
import ImageTile from "../screens/ImageTile";
import EditLocationScreen from "../screens/EditLocationScreen";
import ProfileScreen from "../screens/ProfileScreen";

import DashboardTabNavigator from "./DashboardTabNavigator";

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    // Details: LocationDetailsScreen,
    // AdditionalPhotos: AdditionalPhotosScreen,
    // AdditionalPhotosTile: AdditionalPhotosTile,
    // ImageBrowser: ImageBrowser,
    // ImageTile: ImageTile,
    // EditLocation: EditLocationScreen,
    // Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      // const { routeName } = navigation.state.routes[navigation.state.index];
      return {
      //   headerTitle: routeName,
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

export default DashboardStackNavigator;
