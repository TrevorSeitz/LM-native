import React from "react";
import {
  createAppContainer,
} from "react-navigation";

import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AddLocationScreen from "./AddLocationScreen";
import ListLocationsScreen from "./ListLocationsScreen";
import LocationDetailsScreen from "./LocationDetailsScreen";
import EditLocationScreen from "./EditLocationScreen";

const AppNavigator = createStackNavigator({
  // this sets up the screens for navigation - it creates the stack
  Map:  HomeScreen,
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
