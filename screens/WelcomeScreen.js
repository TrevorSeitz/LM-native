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

// import DashboardTabNavigator from "../navigation/DashboardTabNavigator";
import DashboardStackNavigator from "../navigation/DashboardStackNavigator";
import AppDrawerNavigator from "../navigation/AppDrawerNavigator";

// import DashboardScreenfrom from "./DashboardScreen";
import HomeScreen from "./HomeScreen";
import NewPlaceScreen from "./NewPlaceScreen";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Dashboard")}
        />
        <Button title="Sign Up" onPress={() => alert("Button Pressed")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WelcomeScreen;
