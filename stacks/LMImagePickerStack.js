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
import LMImagePickerScreen from "../screens/LMImagePickerScreen";

const LMImagePickerStack = createStackNavigator(
  {
    LMImagePicker: {
      screen: LMImagePickerScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Add A New Place",
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
    Home: { screen: HomeScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default LMImagePickerStack;