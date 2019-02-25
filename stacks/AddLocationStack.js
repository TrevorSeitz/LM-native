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
import AddLocationScreen from "../screens/AddLocationScreen";

const AddLocationStack = createStackNavigator(
  {
    AddLocation: {
      screen: AddLocationScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Add New Location",
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
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default AddLocationStack;
