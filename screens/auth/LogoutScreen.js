import React from "react";
import * as firebase from "firebase";
import { StyleSheet, View, Text, Button } from "react-native";
import { TextInput } from 'react-native-paper';


export default class LogoutScreen extends React.Component {
  logout = () => {
    firebase.auth().signOut();
  };
  render() {
    this.logout();
    return <View />;
  }
}
