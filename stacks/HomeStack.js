import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button, Platform } from "react-native";
// import {Ionicons} from "@expo/vector-icons";
import { Constants, MapView, Icon } from "expo";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator(
  {
    Map: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Map",
          headerLeft: (
            <Icon.Ionicons
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default HomeStack;
