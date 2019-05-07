import React from "react";
import { createStackNavigator } from "react-navigation";
import { View } from "react-native";
import { Icon } from "expo";
import AddLocationScreen from "../screens/AddLocationScreen";

const AddLocationStack = createStackNavigator(
  {
    AddLocation: {
      screen: AddLocationScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Add New Location",
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
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default AddLocationStack;
