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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  List: ListLocationsScreen,
  Details: LocationDetailsScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const ListLocationsStack = createStackNavigator({
  ListLocations: ListLocationsScreen
});

ListLocationsStack.navigationOptions = {
  tabBarLabel: "ListLocations",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

const LocationDetailsStack = createStackNavigator({
  LocationDetails: LocationDetailsScreen
});

LocationDetailsStack.navigationOptions = {
  tabBarLabel: "LocationDetails",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ListLocationsStack,
  LocationDetailsStack
});
