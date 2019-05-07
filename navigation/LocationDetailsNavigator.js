import React from "react";
import { createStackNavigator } from "react-navigation";
// Screens
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
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
