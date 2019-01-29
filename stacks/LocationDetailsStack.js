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
import LocationDetailsScreen from "../screens/LocationDetailsScreen";

const LocationDetailsStack = createStackNavigator(
  {
    LocationDetails: {
      screen: LocationDetailsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Location Details",
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
    Home: { screen: HomeScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default LocationDetailsStack;
