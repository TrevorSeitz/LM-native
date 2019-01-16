import React, { Component } from "react";
import {
  createStackNavigator,
  // createAppContainer,
  // createSwitchNavigator,
  // createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import HomeStack from "../stacks/HomeStack";
import NewPlaceStack from "../stacks/NewPlaceStack";

// import DashboardTabNavigator from "./DashboardTabNavigator";
// import AppDrawerNavigator from "./AppDrawerNavigator";

// import DashboardScreenfrom from "../screens/DashboardScreen";
// import HomeScreen from "../screens/HomeScreen";
// import NewPlaceScreen from "../screens/NewPlaceScreen";

const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    NewPlaceStack
    // SettingsStack
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
