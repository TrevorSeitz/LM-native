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
// import LMImagePickerNavigator from "./";

const AppNavigator = createStackNavigator({
  // this sets up the screens for navigation
  // Home: { screen: MainTabNavigator },
  // AddLocation: { screen: AddLocationNavigator },
  // ListLocations: { screen: ListLocationsNavigator }
  Home: { MainTabScreen },
  AddLocation: { AddLocationScreen },
  ListLocations: { ListLocationsScreen },
  Details: { LocationDetailsScreen },
  AdditionalPhotos: { AdditionalPhotosBrowser },
  EditLocation: { EditLocationScreen }
});

const AppContainer = createAppContainer(appNavigator);
// this is what will be displayed in App.js
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;

export default AppContainer;
