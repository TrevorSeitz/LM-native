import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import NewFormNavigator from "./NewFormNavigator";

// exp

const AppNavigator = createStackNavigator({
  Home: { screen: MainTabNavigator },
  New: { screen: NewFormNavigator }
});

const AppContainer = createAppContainer(appNavigator);
<AppContainer
  onNavigationStateChange={handleNavigationChange}
  uriPrefix="/app"
/>;
// export default AppNavigator;
export default AppContainer;
