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
import { FeedStack, ProfileStack, SettingsStack } from "../App";
import SettingsScreem from "./SettingsScreen";
import NewPlaceScreen from "./NewPlaceScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
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
    NewPlace: { screen: NewPlace }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
// };

export default HomeStack;
