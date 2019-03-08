import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";

const ListLocationsStack = createStackNavigator({
  List: ListLocationsScreen,
  Details: LocationDetailsScreen,
  Edit: EditLocationScreen,
  AdditionalPhotos: AdditionalPhotosScreen
});

ListLocationsScreen.navigationOptions = {
  tabBarLabel: "List All Locations",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list${focused ? "" : ""}`
          : "md-list"
      }
    />
  )
};

export default createBottomTabNavigator({
  ListLocationsStack
});