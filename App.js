import React, { Component } from "react";

import { createAppContainer } from "react-navigation";

import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

import { StyleSheet } from "react-native";

export default class App extends React.Component {
  state = { switchValue: false };

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
