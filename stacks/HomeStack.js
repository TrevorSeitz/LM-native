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
import NewPlaceScreen from "../screens/NewPlaceScreen";
import TestScreen from "../screens/TestScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Home",
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
    NewPlace: { screen: NewPlaceScreen },
    Test: { screen: TestScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
// };

export default HomeStack;
