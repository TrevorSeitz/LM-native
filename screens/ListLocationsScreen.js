import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native";
import { ListItem, Button, Avatar } from "react-native-elements";
// import FontAwesome, { Icons } from "react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  MediaLibrary,
  FlatList
} from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class ListLocationsScreen extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("locations");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      locations: [],
      uid: this._retrieveData()
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      "Material Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    });

    this.setState({ isLoading: false });
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  onCollectionUpdate = querySnapshot => {
    const uid = this.state.uid;
    let locations = [];
    this.ref
      .where("uid", "==", uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const uid = doc.data().uid;
          const name = doc.data().name;
          const venue = doc.data().venue;
          const latitude = doc.data().latitude;
          const longitude = doc.data().longitude;
          const contactName = doc.data().contactName;
          const contactPhone = doc.data().contactPhone;
          const email = doc.data().email;
          const description = doc.data().description;
          const imageFileLocation = doc.data().imageFileLocation;
          locations.push({
            id: id,
            uid: uid,
            name: name,
            venue: venue,
            latitude: latitude,
            longitude: longitude,
            contactName: contactName,
            contactPhone: contactPhone,
            email: email,
            description: description,
            imageFileLocation: imageFileLocation
          });
        });
      })
      .then(() => {
        this.setState({ locations: locations });
        // this.state.locations.map((item, i) => console.log(item));
      });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    console.log(this.state.locations)
    return (
      <ScrollView style={styles.container}>
          {this.state.locations.map((item, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: item.imageFileLocation } }}
              title={item.name}
              subtitle={item.description}
              onPress={() => {
              this.props.navigation.push("Details", {
                key: `${JSON.stringify(item.id)}`
                });
              }}
            />
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
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
