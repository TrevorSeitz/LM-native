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

import AdditionalImageBrowserStack from "../stacks/AdditionalImageBrowserStack";

import AdditionalImageBrowserSwitchNavigator from "../navigation/switches/AdditionalImageBrowserSwitchNavigator"

const EditAdditionalPhotosStack = createStackNavigator(
  {
    EditPhotos: {
      screen: EditAdditionalPhotosScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Edit Photos",
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
    // Edit: EditAdditionalPhotosStack,
    // EditAdditionalPhotos: EditAdditionalPhotosScreen,
    // AdditionalImageBrowser: AdditionalImageBrowser,
    AdditionalImageBrowser: AdditionalImageBrowserStack,
    // AdditionalImageBrowser: AdditionalImageBrowserSwitchNavigator,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);
export default EditAdditionalPhotosStack
;
