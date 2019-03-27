import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  View,
  // TextInput,
  Image,
  Alert
} from "react-native";
import { TextInput } from 'react-native-paper';
import {  List, ListItem, Text, Card, Button } from "react-native-elements";
import * as firebase from "firebase";

export default class EditLocationScreen extends Component {
  static navigationOptions = {
    title: "Edit Location"
  };

  constructor() {
    super();
    this.state = {
      location: {},
      isLoading: false
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
        // console.log("nav key", JSON.parse(navigation.getParam("key")))
    firebase
      .firestore()
      .collection("locations")
      .doc(JSON.parse(navigation.getParam("key")))
      .get().then(doc => {
      if (doc.exists) {
        this.setState({
          location: doc.data(),
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    })
    .then(() => {
      this._retrieveData()
    })
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key")
      // .then((value) => {console.log("edit page retrieved key = ", value)})
      .then((value) => {
      if (value !== null) {
        this.setState({ storedkey: value })
      }})
    } catch (error) {}
    // console.log("edit page page retrieved key = ", this.state.key)
  };

  // _storeData = async user => {
  //   try {
  //     // await AsyncStorage.setItem("photosLocations", this.state.location.photosLocations)
  //     await AsyncStorage.setItem("key", this.state.key)
  //   } catch (error) {}
  // };

  updateTextInput = (text, field) => {
    const state = this.state.location;
    state[field] = text;
    this.setState(state);
  };

  updateLocation() {
    this.setState({
      isLoading: true
    });
    const id = (this.state.key).replace(/"/g, '');
    const { navigation } = this.props;
    firebase
      .firestore()
      .collection("locations")
      .doc(id)
      .set({
        key: id,
        uid: this.state.location.uid,
        name: this.state.location.name,
        venue: this.state.location.venue,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        contactName: this.state.location.contactName,
        contactPhone: this.state.location.contactPhone,
        email: this.state.location.email,
        description: this.state.location.description,
        photosLocations: this.state.location.photosLocations,
        image: this.state.location.image,
        imageFileName: this.state.location.imageFileName,
        imageFileLocation: this.state.location.imageFileLocation
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      })
      .then(() =>{
        this.setState({
          isLoading: false
        })
        Alert.alert("Success!")
      })
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
            value={this.state.location.name}
            onChangeText={text => this.updateTextInput(text, "name")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Venue"}
            value={this.state.location.venue}
            onChangeText={text => this.updateTextInput(text, "venue")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Contact Name"}
            value={this.state.location.contactName}
            onChangeText={text => this.updateTextInput(text, "contactName")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"Contact Phone"}
            value={this.state.location.contactPhone}
            onChangeText={text => this.updateTextInput(text, "contactPhone")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"email"}
            value={this.state.location.email}
            onChangeText={text => this.updateTextInput(text, "email")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"Description"}
            value={this.state.location.description}
            onChangeText={text => this.updateTextInput(text, "description")}
          />
        </View>
        <View style={styles.imageBox}>
          <View>
            <Image style={styles.image} source={{ uri: this.state.location.imageFileLocation }} />
          </View>
        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#999999"}
            color={"#FFFFFF"}
            title="Add/Edit Additional Photos"
            onPress={() => {
              this.props.navigation.push("EditAdditionalPhotos", {
                photosLocations: this.state.location.photosLocations
              });
            }}
          />
        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            leftIcon={{ name: "update" }}
            title="Update"
            onPress={() => this.updateLocation()}
          />
        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#999999"}
            color={"#FFFFFF"}
            leftIcon={{ name: "delete" }}
            title="Delete"
            onPress={() => this.deleteLocation(this.state.key)}
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
  detailButton: {
    marginTop: 10
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 5,
    padding: 5,
    width: 100,
    height: 100
  },
  imageBox: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
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

// export default EditLocationScreen;
