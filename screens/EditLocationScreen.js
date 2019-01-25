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
      .doc(JSON.parse(navigation.getParam("locationkey")));
    ref.get().then(doc => {
      if (doc.exists) {
        const location = doc.data();
        this.setState({
          key: "doc.id",
          name: "location.name",
          venue: "location.venue",
          latitude: "location.latitude",
          longitude: "location.longitude",
          contactName: "location.contactName",
          contactPhone: "location.contactPhone",
          email: "location.email",
          description: "location.description",
          image: "location.image",
          imageFileName: "location.imageFileName",
          imageFileLocation: "location.imageFileLocation",
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
    const { navigation } = this.props;
    const updateRef = firebase
      .firestore()
      .collection("locations")
      .doc(this.state.key);
    updateRef
      .set({
        title: this.state.title,
        description: this.state.description,
        author: this.state.author
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
          author: "",
          isLoading: false
        });
        this.props.navigation.navigate("Location");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Add Location</Text>
        <Button
          title="Go to Edit Location... again"
          onPress={() => this.props.navigation.push("EditLocation")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Location")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
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
            placeholder={"Title"}
            value={this.state.title}
            onChangeText={text => this.updateTextInput(text, "title")}
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
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Author"}
            value={this.state.author}
            onChangeText={text => this.updateTextInput(text, "author")}
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
