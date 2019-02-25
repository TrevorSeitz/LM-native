import React from "react";
import {
  createAppContainer,
  // createSwitchNavigator,
  // createStackNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import AddLocationcreen from "../screens/AddLocationScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AdditionalPhotosTile from "../screens/AdditionalPhotosTile";
import ImageBrowser from "../screens/ImageBrowser";
import ImageTile from "../screens/ImageTile";
import EditLocationScreen from "../screens/EditLocationScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AppNavigator = createStackNavigator({
  // this sets up the screens for navigation
  Home:  HomeScreen,
  AddLocation:  AddLocationScreen,
  ListLocations:  ListLocationsScreen,
  Details:  LocationDetailsScreen,
  AdditionalPhotos:  AdditionalPhotosScreen,
  AdditionalPhotosTile: AdditionalPhotosTile,
  ImageBrowser: ImageBrowser,
  ImageTile: ImageTile,
  EditLocation:  EditLocationScreen,
  Profile: ProfileScreen
});

const AppContainer = createAppContainer(appNavigator);
// this is what will be displayed in App.js
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;

export default AppContainer;
