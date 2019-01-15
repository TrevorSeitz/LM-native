import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import WelcomeScreen from "./screens/WelcomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";

import AppDrawerNavigator from "./navigation/AppDrawerNavigator";

export default class App extends React.Component {
  state = { switchValue: false };

  render() {
    return <AppContainer />;
  }
}

class Detail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Detail</Text>
      </View>
    );
  }
}
//
// const FeedStack = createStackNavigator(
//   {
//     Feed: {
//       screen: Feed,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerTitle: "Feed",
//           headerLeft: (
//             <Icon
//               style={{ paddingLeft: 10 }}
//               onPress={() => navigation.openDrawer()}
//               name="md-menu"
//               size={30}
//             />
//           )
//         };
//       }
//     },
//     Detail: { screen: Detail }
//   },
//   {
//     defaultNavigationOptions: {
//       gesturesEnabled: false
//     }
//   }
// );

// const SettingsStack = createStackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: ({ navigation }) => {
//       return {
//         headerTitle: "Settings",
//         headerLeft: (
//           <Icon
//             style={{ paddingLeft: 10 }}
//             onPress={() => navigation.openDrawer()}
//             name="md-menu"
//             size={30}
//           />
//         )
//       };
//     }
//   }
// });

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
