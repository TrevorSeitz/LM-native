import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput
} from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

class EditLocationScreen extends Component {
  static navigationOptions = {
    title: "Edit Location"
  };

  constructor() {
    super();
    this.state = {
      key: "",
      id: "",
      name: "",
      venue: "",
      latitude: "",
      longitude: "",
      contactName: "",
      contactPhone: "",
      email: "",
      description: "",
      image: "nil",
      imageFileName: "",
      imageFileLocation: "",
      isLoading: false
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase
      .firestore()
      .collection("locations")
      .doc(JSON.parse(navigation.getParam("Locationkey")));
    ref.get().then(doc => {
      if (doc.exists) {
        const location = doc.data();
        this.setState({
          key: doc.id,
          name: location.name,
          venue: location.venue,
          latitude: location.latitude,
          longitude: location.longitude,
          contactName: location.contactName,
          contactPhone: location.contactPhone,
          email: location.email,
          description: location.description,
          image: location.image,
          imageFileName: location.imageFileName,
          imageFileLocation: location.imageFileLocation,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  updateLocation() {
    this.setState({
      isLoading: true
    });
    const id = this.state.key;
    const { navigation } = this.props;
    const updateRef = firebase
      .firestore()
      .collection("locations")
      .doc(id);
    updateRef
      .set({
        key: id,
        name: this.state.name,
        venue: this.state.venue,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        contactName: this.state.contactName,
        contactPhone: this.state.contactPhone,
        email: this.state.email,
        description: this.state.description,
        image: this.state.image,
        imageFileName: this.state.imageFileName,
        imageFileLocation: this.state.imageFileLocation
      })
      // .then(docRef => {
      //   this.setState({
      //     key: "",
      //     id: "",
      //     name: "",
      //     venue: "",
      //     latitude: "",
      //     longitude: "",
      //     contactName: "",
      //     contactPhone: "",
      //     email: "",
      //     description: "",
      //     image: "nil",
      //     imageFileName: "",
      //     imageFileLocation: "",
      //     isLoading: false
      //   });
      // this.props.navigation.navigate("Location");
      // })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
    this.props.navigation.navigate("Details", {
      Locationkey: `${JSON.stringify(id)}`
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
            label={"Name"}
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
          <Button
            large
            leftIcon={{ name: "update" }}
            title="Update"
            onPress={() => this.updateLocation()}
          />
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

export default EditLocationScreen;
