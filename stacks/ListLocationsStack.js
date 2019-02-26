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
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import AdditionalPhotosTile from "../screens/AdditionalPhotosTile";
import ImageBrowser from "../screens/ImageBrowser";
import ImageTile from "../screens/ImageTile";

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
    // Home: { screen: HomeScreen },

    Details: LocationDetailsScreen,
    AdditionalPhotos: AdditionalPhotosScreen,
    AdditionalPhotosTile: AdditionalPhotosTile,
    ImageBrowser: ImageBrowser,
    ImageTile: ImageTile

  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default ListLocationsStack;
