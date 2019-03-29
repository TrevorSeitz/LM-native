import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  View,
  Image
} from "react-native";
import { List, ListItem, Text, Card, Button } from "react-native-elements";
import * as firebase from "firebase";

export default class LocationDetailsScreen extends Component {
  static navigationOptions = {
    title: "Location Details"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      location: {},
      key: "",
      storedkey: ""
    };
    this.storageRef = firebase.storage()
    // var storageRef = storage.ref()
  }

  _storeData = async ()=> {
    try {
      await AsyncStorage.setItem("key", this.state.key);
    } catch (error) {}
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key")
      .then((value) => {
      if (value !== null) {
        this.setState({ storedkey: value })
      }})
    } catch (error) {}
  };

  componentDidMount() {
    const { navigation } = this.props;
    firebase
      .firestore()
      .collection("locations")
      .doc(JSON.parse(navigation.getParam("key")))
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            location: doc.data(),
            key: doc.id,
            isLoading: false
          })
        } else {
          console.log("No such document!");
        }
      })
      .then(() => this._storeData())
  }


  confirmDelete = () => {
    Alert.alert(
     '',
     'Are you sure you want to delete '+this.state.location.name+'?',
     [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteLocation(this.state.key)},
     ],
     { cancelable: false }
   )
  };

  deleteLocation = (key) => {
    this.setState({
      isLoading: true
    });
    // TODO: delete all photos from this location using file names
    const { navigation } = this.props;
    const uid = this.state.location.uid
    let photosNames = this.state.location.photosNames

    for (photo in photosNames) {  //delete photos
      firebase
        .storage()
        .ref("images/" + uid + "/")
        .child(photosNames[photo])
        .delete()
        .then(() => {
          console.log("Photo successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
          this.setState({
            isLoading: false
          });
        });
    }

    firebase  // delete location
      .firestore()
      .collection("locations")
      .doc(key)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.setState({
          isLoading: false
        });
        navigation.navigate("Location");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        this.setState({
          isLoading: false
        });
      });
    this.props.navigation.navigate("ListLocations");
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const imageURL = this.state.location.imageFileLocation;
    // figure out how to delete images from storage by filename
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.name}>{this.state.location.name}</Text>
            </View>
            <View>
              <Text h4>{this.state.location.venue}</Text>
            </View>
            <View>
              <Text h5>{this.state.location.contactName}</Text>
            </View>
            <View>
              <Text h5>Phone: {this.state.location.contactPhone}</Text>
            </View>
            <View>
              <Text h5>email: {this.state.location.email}</Text>
            </View>
          </View>
          <View>
            <Text>Description:</Text>
            <Text h4>{this.state.location.description}</Text>
          </View>
          <View style={styles.imageBox}>
            <View>
              <Image style={styles.image} source={{ uri: imageURL }} />
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#999999"}
              color={"#FFFFFF"}
              title="See Additional Photos" disabled={(this.state.location.photosLocations.length == 0)}
              onPress={() => {
                this.props.navigation.push("AdditionalPhotos", {
                  key: `${JSON.stringify(this.state.key)}`
                });
              }}
            />
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#999999"}
              color={"#FFFFFF"}
              leftIcon={{ name: "edit" }}
              title="Edit"
              onPress={() => {
                this.props.navigation.navigate("Edit", {
                  key: `${JSON.stringify(this.state.key)}`
                });
              }}
            />
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#999999"}
              color={"#FFFFFF"}
              leftIcon={{ name: "delete" }}
              title="Delete"
              onPress={() => this.confirmDelete()}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  subContainer: {
    flex: 1,
    marginBottom: 5,
    padding: 2,
    borderBottomWidth: 1,
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
  },
  detailButton: {
    marginTop: 10
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 5,
    padding: 5,
    width: 200,
    height: 200
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
  name: {
    fontSize: 36,
    // fontWeight: 'bold',
    textAlign: 'center',
  }
});
