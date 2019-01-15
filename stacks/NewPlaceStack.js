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

const NewPlaceStack = createStackNavigator(
  {
    NewPlace: {
      screen: NewPlaceScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "NewPlace",
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
    NewPlace: { screen: NewPlaceScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
// };

export default NewPlaceStack;
