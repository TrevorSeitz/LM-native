import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { Constants, MapView } from "expo";

import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditAdditionalPhotosScreen from "../screens/EditAdditionalPhotosScreen";
import AdditionalImageBrowser from "../screens/AdditionalImageBrowser";

// import EditAdditionalPhotosStack from "../stacks/EditAdditionalPhotosStack";

import EditAdditionalPhotosSwitchNavigator from "../navigation/switches/EditAdditionalPhotosSwitchNavigator"

const AdditionalImageBrowserStack = createStackNavigator(
  {
    AdditionalImageBrowser: {
      screen: AdditionalImageBrowser,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Edit Location",
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    },
    // ListLocations: ListLocationsScreen,
    // EditPhotos: EditAdditionalPhotosStack,
    // EditAdditionalPhotos: EditAdditionalPhotosStack,
    // EditAdditionalPhotos: EditAdditionalPhotosScreen,
    // AdditionalImageBrowser: AdditionalImageBrowser,
    // EditAdditionalPhotos: EditAdditionalPhotosSwitchNavigator,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null,
      tabBarVisible: false,
    }
  }
);
export default AdditionalImageBrowserStack
;
