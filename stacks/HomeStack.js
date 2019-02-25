import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

<<<<<<< HEAD
=======
// import {  } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { Constants, MapView } from "expo";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import AddLocationScreen from "../screens/AddLocationScreen";
import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
    AddLocation: AddLocationScreen,
    ListLocations: ListLocationsScreen, 
    LocationDetails: LocationDetailsScreen,
    EditLocation: EditLocationScreen,
    AdditionalPhotos: AdditionalPhotosScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

<<<<<<< HEAD
  HomeScreen.navigationOptions = {
    tabBarLabel: "Home!",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-home${focused ? "" : ""}`
            : "md-home"
        }
      />
    )
  };
=======
HomeScreen.navigationOptions = {
  tabBarLabel: "Home!",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? '' : ""}`
          : "md-home"
      }
    />
  )
};
// };
>>>>>>> 366320cb03367622a8f7578cd4c9d01b8e6bd7b7

export default HomeStack;
