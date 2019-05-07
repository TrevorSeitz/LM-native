import React from "react";
import * as firebase from "firebase";
import { View } from "react-native";

export default class LogoutScreen extends React.Component {
  logout = () => {
    firebase.auth().signOut();
  };
  render() {
    this.logout();
    return <View />;
  }
}
