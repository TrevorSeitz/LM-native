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
import AdditionalPhotosBrowser from "../screens/AdditionalPhotosBrowser";

const AdditionalPhotosStack = createStackNavigator(
  {
    AdditionalPhotos: {
      screen: AdditionalPhotosBrowser,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Additional Location Photos",
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
    Home: { screen: HomeScreen },
    ListLocations: { screen: ListLocationsScreen },
    Details: { screen: LocationDetailsScreen},
    EditLocation: { screen: EditLocationScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default LocationDetailsStack;
