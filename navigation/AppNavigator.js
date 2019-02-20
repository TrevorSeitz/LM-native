import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import HomeNavigator from "./HomeNavigator";
import AddLocationNavigator from "./AddLocationNavigator";
import ListLocationsNavigator from "./ListLocationsNavigator";
import LocationDetailsNavigator from "./LocationDetailsNavigator";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
// import LMImagePickerNavigator from "./";

const AppNavigator = createStackNavigator({
  // this sets up the screens for navigation
  Home:  MainTabScreen,
  AddLocation:  AddLocationScreen,
  ListLocations:  ListLocationsScreen,
  Details:  LocationDetailsScreen,
  AdditionalPhotos:  AdditionalPhotosScreen,
  EditLocation:  EditLocationScreen
});

const AppContainer = createAppContainer(appNavigator);
// this is what will be displayed in App.js
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;

export default AppContainer;
