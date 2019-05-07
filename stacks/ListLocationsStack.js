import React from "react";
import { createStackNavigator } from "react-navigation";
import { View } from "react-native";
import { Icon } from "expo";

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
