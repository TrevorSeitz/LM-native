import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

import { StyleSheet } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { switchValue: false };

    // Initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }
  }

  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(AppSwitchNavigator);

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
