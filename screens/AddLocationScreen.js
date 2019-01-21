import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput
} from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
// import firebase from "../Firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { Font, AppLoading } from "expo";

import LMImagePickerScreen from "./LMImagePickerScreen";

class AddLocationScreen extends Component {
  static navigationOptions = {
    title: "Add Location"
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection("locations");
    this.state = {
      photoFileName: "",
      name: "",
      venue: "",
      latitude: "",
      longitude: "",
      contactName: "",
      contactPhone: "",
      email: "",
      description: "",
      isLoading: false
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
    console.log("this.state.name", this.state.name);
  };

  saveLocation() {
    this.setState({
      isLoading: true
    });
    this.ref
      .add({
        // photoFileName: "",
        name: this.state.name,
        venue: this.state.venue,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        contactName: this.state.contactName,
        contactPhone: this.state.contactPhone,
        email: this.state.email,
        description: this.state.description
      })
      .then(docRef => {
        this.setState({
          // photoFileName: "",
          name: "",
          venue: "",
          latitude: "",
          longitude: "",
          contactName: "",
          contactPhone: "",
          email: "",
          description: "",
          isLoading: false
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Name"}
            value={this.state.name}
            onChangeText={text => this.updateTextInput(text, "name")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Venue"}
            value={this.state.venue}
            onChangeText={text => this.updateTextInput(text, "venue")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Contact Name"}
            value={this.state.contactName}
            onChangeText={text => this.updateTextInput(text, "contactName")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Contact Phone"}
            value={this.state.contactPhone}
            onChangeText={text => this.updateTextInput(text, "contactPhone")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"email"}
            value={this.state.email}
            onChangeText={text => this.updateTextInput(text, "email")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Description"}
            value={this.state.description}
            onChangeText={text => this.updateTextInput(text, "description")}
          />
        </View>
        <View style={styles.button}>
          <Button large title="Save" onPress={() => this.saveLocation()} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC"
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AddLocationScreen;
