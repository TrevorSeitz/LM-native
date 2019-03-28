import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button } from "react-native";
// import {Ionicons} from "@expo/vector-icons";
import { Constants, MapView, Icon } from "expo";

import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import EditLocationStack from "../stacks/EditLocationStack";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AdditionalImageBrowser from "../screens/AdditionalImageBrowser";

const LocationDetailsStack = createStackNavigator(
  {
    LocationDetails: {
      screen: LocationDetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Location Details",
          headerLeft: (
            <Icon.Ionicons
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
    Edit: EditLocationScreen,
    AdditionalPhotos: AdditionalPhotosScreen,
    // AdditionalImageBrowser: AdditionalImageBrowser,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);
export default LocationDetailsStack;
