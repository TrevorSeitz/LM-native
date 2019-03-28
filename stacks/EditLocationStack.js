import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button } from "react-native";
// import {Ionicons} from "@expo/vector-icons";
import { Icon } from 'expo';
import { Constants, MapView } from "expo";

// import HomeScreen from "../screens/HomeScreen";
// import ListLocationsScreen from "../screens/ListLocationsScreen";
// import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import EditAdditionalPhotosScreen from "../screens/EditAdditionalPhotosScreen";
import AdditionalImageBrowser from "../screens/AdditionalImageBrowser";

// import EditAdditionalPhotosStack from "../stacks/EditAdditionalPhotosStack";

// import EditAdditionalPhotosSwitchNavigator from "../navigation/switches/EditAdditionalPhotosSwitchNavigator";

const EditLocationStack = createStackNavigator(
  {
    Edit: {
      screen: EditLocationScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Edit Location",
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
    // ListLocations: ListLocationsScreen,
    // Edit: EditLocationStack,
    EditAdditionalPhotos: EditAdditionalPhotosScreen,
    // EditAdditionalPhotos: EditAdditionalPhotosStack,
    AdditionalImageBrowser: AdditionalImageBrowser,
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);
export default EditLocationStack
;
