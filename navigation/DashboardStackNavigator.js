import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

// import HomeStack from "../stacks/HomeStack";
// import AddLocationStack from "../stacks/AddLocationStack";
// import ListLocationsStack from "../screens/ListLocationsStack";
import HomeScreen from "../screens/HomeScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
// import LocationDetailsScreen from "../screens/LocationDetailsScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import LogoutScreen from "../screens/auth/LogoutScreen";

import LocationDetailsScreen from "../screens/LocationDetailsScreen";

const DashboardTabNavigator = createBottomTabNavigator(
  // this is where the tab navigator is built
  {
    // Home: HomeStack,
    // "Add Location": AddLocationStack,
    // "List Locations": ListLocationsStack
      Home: HomeScreen,
      "Add Location": AddLocationScreen,
      "List Locations": ListLocationsScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        // header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
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
  }
);

export default DashboardStackNavigator;
