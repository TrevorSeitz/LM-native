import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";

import { createAppContainer } from "react-navigation";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
//
// import { MaterialIcons } from "@expo/vector-icons";
// import { Font, AppLoading } from "expo";

import LoginSwitchNavigator from "./navigation/switches/LoginSwitchNavigator";
import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    // Initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
      var database = firebase.database();
    }
    onAuthStateChanged = user => {
      this.setState({ isAuthenticationReady: true });
      this.setState({ isAuthenticated: !!use });
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
        {this.state.isAuthenticated ? (
          <AppContainer />
        ) : (
          <LoginSwitchNavigator />
        )}
      </View>
    );
  }
}

const AppContainer = createAppContainer(AppSwitchNavigator);
const LoginContainer = createAppContainer(LoginSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
