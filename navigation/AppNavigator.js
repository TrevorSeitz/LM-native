import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import NewFormNavigator from "./NewFormNavigator";
// import LMImagePickerNavigator from "./";

const AppNavigator = createStackNavigator({
  // this sets up the screens for navigation
  Home: { screen: MainTabNavigator },
  New: { screen: NewFormNavigator },
  LMImagePicker: { screen: LMImagePickerNavigator }
});

const AppContainer = createAppContainer(appNavigator);
// this is what will be displayed in App.js
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;

export default AppContainer;
