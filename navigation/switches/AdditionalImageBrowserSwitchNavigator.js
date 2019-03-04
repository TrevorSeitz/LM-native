import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import AdditionalImageBrowser from "../../screens/AdditionalImageBrowser";
import LoadingScreen from "../../screens/auth/LoadingScreen";


import EditAdditionalPhotosStack from "../../stacks/EditAdditionalPhotosStack";

const AdditionalImageBrowserSwitchNavigator = createSwitchNavigator(
  {

    // EditAdditionalPhotos: EditAdditionalPhotosStack,
    AdditionalImageBrowser: AdditionalImageBrowser,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: "Loading"
  }
);

export default AdditionalImageBrowserSwitchNavigator;
