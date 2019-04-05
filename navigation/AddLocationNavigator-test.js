import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import AddLocationScreen from "../screens/AddLocationScreen";

const AddLocationStack = createStackNavigator({
  AddLocation: AddLocationScreen
});

AddLocationScreen.navigationOptions = {
  tabBarLabel: "Add A New Location",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-add${focused ? "" : ""}` : "md-add"}
    />
  )
};

export default createBottomTabNavigator({
  AddLocationStack
});
