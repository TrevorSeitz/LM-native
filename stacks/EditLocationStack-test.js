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
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";

const EditLocationStack = createStackNavigator(
  {
    EditLocation: {
      screen: EditLocationScreen,
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
    // Home: { screen: HomeScreen },
    Details: { screen: LocationDetailsScreen },
    ListLocations: { screen: ListLocationsScreen },
    AdditionalPhotos: { screen: AdditionalPhotosScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default EditLocationStack;
