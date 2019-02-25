import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
// import HomeScreen from "../screens/HomeScreen";
// import ListLocationsScreen from "../screens/ListLocationsScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import EditLocationScreen from "../screens/EditLocationScreen";
import AdditionalPhotosScreen from "../screens/AdditionalPhotosScreen";

const AdditionalPhotosStack = createStackNavigator({
  Details: LocationDetailsScreen,
  Edit: EditLocationScreen,
  AdditionalPhotos: AdditionalPhotosScreen
});

// AdditionalPhotosScreen.navigationOptions = {
//   tabBarLabel: "Additional Location Photos",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-information-circle${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };

export default createBottomTabNavigator({
  // HomeStack,
  // ListLocationsStack,
  // LocationDetailsStack,
  // EditLocationStack,
  AdditionalPhotosStack,
});
