import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import AdditionalImageBrowserSwitchNavigator from "./AdditionalImageBrowserSwitchNavigator";

import AdditionalImageBrowser from "../../screens/AdditionalImageBrowser";
import LoadingScreen from "../../screens/auth/LoadingScreen";

const EditAdditionalPhotosSwitchNavigator = createSwitchNavigator(
  {
    // LocatioDetailsScreen: LocatioDetailsScreen,

    Loading: LoadingScreen,
    AdditionalImageBrowser: AdditionalImageBrowserSwitchNavigator,
    // AdditionalImageBrowser: AdditionalImageBrowser,
  },
  {
    initialRouteName: "Loading"
  }
);

export default EditAdditionalPhotosSwitchNavigator;
