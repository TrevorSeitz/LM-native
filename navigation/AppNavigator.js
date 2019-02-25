import React from "react";
import {
  createAppContainer,
  // createSwitchNavigator,
  // createStackNavigator
} from "react-navigation";

<<<<<<< HEAD
import HomeNavigator from "./HomeNavigator";
import AddLocationNavigator from "./AddLocationNavigator";
import ListLocationsNavigator from "./ListLocationsNavigator";

import LocationDetailsNavigator from "./LocationDetailsNavigator";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AddLocationScreen from "./AddLocationScreen";
import ListLocationsScreen from "./ListLocationsScreen";
import LocationDetailsScreen from "./LocationDetailsScreen";
import EditLocationScreen from "./EditLocationScreen";
=======
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
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7

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
