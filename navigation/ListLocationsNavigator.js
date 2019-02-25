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
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";

const ListLocationsStack = createStackNavigator({
  List: ListLocationsScreen,
  Details: LocationDetailsScreen,
  AdditionalPhotos: AdditionalPhotosScreen
});

ListLocationsScreen.navigationOptions = {
  TabBarLabel: "List All Locations",
  TabBarIcon: ({ focused }) => (
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
