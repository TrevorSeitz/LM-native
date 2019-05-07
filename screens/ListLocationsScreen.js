import React from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  AsyncStorage
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class ListLocationsScreen extends React.Component {
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
          const image = doc.data().image;
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
            image: image,
            imageFileLocation: imageFileLocation
          });
        });
      })
      .then(() => {
        this.setState({ locations });
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

    return (
      <ScrollView style={styles.container}>
        {this.state.locations.map((item, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: item.image.uri } }}
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
