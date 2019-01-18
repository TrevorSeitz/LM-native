import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import NewFormNavigator from "./NewFormNavigator";
// import LMImagePickerNavigator from "./LMImagePickerNavigator";

const AppNavigator = createStackNavigator({
  Home: { screen: MainTabNavigator },
  New: { screen: NewFormNavigator },
  LMImagePicker: { screen: LMImagePickerNavigator }
});

const AppContainer = createAppContainer(appNavigator);
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;
// export default AppNavigator;
// export default createAppContainer(AppNavigator);
export default AppContainer;
