import * as React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import { Constants, MapView, Icon } from "expo";

import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import AdditionalPhotosGallery from "../screens/AdditionalPhotosGallery";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";
import EditLocationStack from "../stacks/EditLocationStack";

const ListLocationsStack = createStackNavigator(
  {
    ListLocations: {
      screen: ListLocationsScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "List Locations",
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
    Details: LocationDetailsScreen,
    Edit: EditLocationStack,
    AdditionalPhotos: AdditionalPhotosScreen,
    AdditionalPhotosGallery: AdditionalPhotosGallery
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default ListLocationsStack;
