import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { View, Text, StyleSheet, Button } from "react-native";
import {Ionicons} from "@expo/vector-icons";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <Button
          title="ForgotPassword"
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        />
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
