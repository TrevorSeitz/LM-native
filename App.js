import React, { Component } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { createAppContainer } from "react-navigation";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import { Constants } from "expo";
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
      isAuthenticated: false,
      user: {},
      uid: ""
    };
  }

  // Initialize firebase
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(ApiKeys.firebaseConfig); //does this actually belong in ApiKeys?
  //     firebase.auth().onAuthStateChanged(this.StateChanged);
  //     var database = firebase.database();
  //   }
  // }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log("state change", user);
      if (user) {
        this._storeData(user);
        this.setState({ user });
        // firebase.User = user;
      } else {
        this.setState({ user: null });
      }
    });
    // this._storeData();
  }

  _storeData = async user => {
    try {
      await AsyncStorage.setItem("uid", user.uid);
    } catch (error) {
      // Error saving data
    }
    this._retrieveData();
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    const user = this.state.user;
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
        {user ? <AppContainer /> : <LoginContainer />}
      </View>
    );
  }
}

const AppContainer = createAppContainer(AppSwitchNavigator);
const LoginContainer = createAppContainer(LoginSwitchNavigator);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 4,
  //   borderWidth: 0.5,
  //   borderColor: "#d6d7da"
  // }
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  }
});
