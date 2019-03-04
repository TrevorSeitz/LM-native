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
import EditLocationScreen from "../screens/EditLocationScreen";
import AdditionalImageBrowser from "../screens/AdditionalImageBrowser";
import EditAdditionalPhotosScreen from "../screens/EditAdditionalPhotosScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AdditionalPhotosTile from "../screens/AdditionalPhotosTile";
import ImageBrowser from "../screens/ImageBrowser";
import ImageTile from "../screens/ImageTile";


import LocationDetailsStack from "../stacks/LocationDetailsStack";
import EditLocationStack from "../stacks/EditLocationStack";
import EditAdditionalPhotosStack from "../stacks/EditAdditionalPhotosStack";
import AdditionalImageBrowserStack from "../stacks/AdditionalImageBrowserStack";

import EditAdditionalPhotosSwitchNavigator from "../navigation/switches/EditAdditionalPhotosSwitchNavigator";
import AdditionalImageBrowserSwitchNavigator from "../navigation/switches/AdditionalImageBrowserSwitchNavigator";


const ListLocationsStack = createStackNavigator(
  {
    ListLocations: {
      screen: ListLocationsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "List Locations",
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
    Details: LocationDetailsScreen,
    Edit: EditLocationScreen,
    // EditAdditionalPhotos: EditAdditionalPhotosStack,
    // EditAdditionalPhotos: EditAdditionalPhotosSwitchNavigator,
    EditAdditionalPhotos: EditAdditionalPhotosStack,
    AdditionalPhotos: AdditionalPhotosScreen,
    // AdditionalImageBrowser: AdditionalImageBrowserSwitchNavigator,
    AdditionalImageBrowser: AdditionalImageBrowser,
    // AdditionalPhotosTile: AdditionalPhotosTile,
    // ImageBrowser: ImageBrowser,
    // ImageTile: ImageTile

  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default ListLocationsStack;
