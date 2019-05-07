import React from "react";
import { StatusBar, StyleSheet, View, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import ApiKeys from "./constants/ApiKeys"; //is this needed jere?
import * as firebase from "firebase";
import { Constants } from "expo";

import LoginSwitchNavigator from "./navigation/switches/LoginSwitchNavigator";
import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      user: {},
      uid: ""
    };
    this._ismounted = false;
  }

  componentDidMount() {
    this.authListener();
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this._storeData(user);
        this.setState({ user, uid: user.uid });
      } else {
        this.setState({ user: null });
      }
    });
  }

  _storeData = async user => {
    try {
      await AsyncStorage.setItem("uid", user.uid);
    } catch (error) {}
  };

  render() {
    const user = this.state.user;
    return (
      <View style={styles.container}>
        {!user ? <LoginContainer /> : <AppContainer />}
      </View>
    );
  }
}

const AppContainer = createAppContainer(AppSwitchNavigator);
const LoginContainer = createAppContainer(LoginSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  }
});
