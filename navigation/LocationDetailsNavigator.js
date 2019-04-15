import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import AdditionalImageBrowser from "../screens/AdditionalImageBrowser";
import AdditionalPhotos from "../screens/AdditionalPhotosScreen";
import AdditionalPhotosGallery from "../screens/AdditionalPhotosGallery";

const LocationDetailsStack = createStackNavigator({
  List: ListLocationsScreen,
  Details: LocationDetailsScreen,
  Edit: EditLocationScreen,
  AdditionalPhotos: AdditionalPhotosScreen,
  AdditionalPhotosGallery: AdditionalPhotosGallery
});

export default LocationDetailsStack;
