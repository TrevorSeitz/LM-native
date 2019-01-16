import React, { Component } from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import HomeStack from "../stacks/HomeStack";
import NewPlaceStack from "../stacks/NewPlaceStack";

const NewPlaceTabNavigator = createBottomTabNavigator(
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

const NewPlaceStackNavigator = createStackNavigator(
  {
    NewPlaceTabNavigator: NewPlaceTabNavigator
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

// export default NewPlaceStackNavigator;
export default NewPlaceTabNavigator;
