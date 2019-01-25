import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import EditLocationScreen from "../screens/EditLocationScreen";

const EditLocationStack = createStackNavigator({
  EditLocation: EditLocationScreen
});

EditLocationScreen.navigationOptions = {
  tabBarLabel: "Edit Location",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ListLocationsStack,
  LocationDetailsStack,
  EditLocationStack
});
