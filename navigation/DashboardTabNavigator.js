import React, { Component } from "react";
import {
  createBottomTabNavigator
} from "react-navigation";import { Platform } from "react-native";
import TabBarIcon from "../components/TabBarIcon";

import HomeStack from "../stacks/HomeStack";

import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import AddLocationStack from "../stacks/AddLocationStack";
import ListLocationsStack from "../stacks/ListLocationsStack";

const DashboardTabNavigator = createBottomTabNavigator(
  // this is where the tab navigator is built
  {
      // Home: HomeScreen,
      Home: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: "Home!",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? `ios-home${focused ? "" : ""}`
                  : "md-home"
              }
            />
          )
        }
      },
      "Add Location": {
        screen: AddLocationStack,
        navigationOptions: {
          tabBarLabel: "Add A New Location",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? `ios-add${focused ? "" : ""}`
                  : "md-add"
              }
            />
          )
        }
      },
      "List Locations":  {
        screen: ListLocationsStack,
        navigationOptions: {
          tabBarLabel: "List All Location",
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
        }
      },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

export default DashboardTabNavigator
