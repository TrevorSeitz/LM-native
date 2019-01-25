import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Text,
  TextInput
} from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  MediaLibrary
} from "expo";

export default class AddLocationScreen extends Component {
  static navigationOptions = {
    title: "Add Location"
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection("locations");
    this.state = {
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

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: 1,
      quality: 0.5,
      exif: true
    });

    // console.log("result", result);
    this.processImage(result);
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: 1,
      quality: 0.5,
      exif: true
    });
    const metadata = result.metadata;

    this.processImage(result, metadata);
  };

  processImage = async (result, metadata) => {
    if (!result.cancelled) {
      this.setState({ image: result });
      // console.log("image", this.state.image.uri);
      // console.log("result", result);
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      this.setState({
        imageFileName: asset.filename,

        imageFileLocation: "manager-8ccf4.appspot.com/images/{asset.filename}"
      });

      // this.uploadImage(result, asset, metadata)
      //   .then(() => {
      //     Alert.alert("Success!");
      //   })
      //   .catch(error => {
      //     Alert.alert(error);
      //   });
    }
  };

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  saveLocation() {
    this.setState({
      isLoading: true
    });
    this.uploadImage(this.state.image)
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });
    this.ref
      .add({
        name: this.state.name,
        venue: this.state.venue,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        contactName: this.state.contactName,
        contactPhone: this.state.contactPhone,
        email: this.state.email,
        description: this.state.description,
        image: this.state.image,
        imageFileName: this.state.imageFileName
      })
      .then(docRef => {
        this.setState({
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
          isLoading: false
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        // console.error("Error adding document: ", error);
        this.setState({
          isLoading: false
        });
      });
  }

  uploadImage = async (result, asset) => {
    const uri = result.uri;
    uriToBlob = uri => {
      // console.log("bloburl", result);
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response);
          }
        };
        xhr.open("GET", uri);
        xhr.responseType = "blob"; // convert type
        xhr.send();
      });
    };

    const blob = await uriToBlob(uri);
    console.log("file", this.state.imageFileLocation);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + this.state.imageFileName)
      .put(blob);
  };

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
        <View style={styles.container}>
          <Button2 onPress={this.selectPicture}>Gallery</Button2>
          <Button2 onPress={this.takePicture}>Take Picture</Button2>
        </View>
        <View style={styles.container}>
          <Button large title="Save" onPress={() => this.saveLocation()} />
          <Image style={styles.image} source={{ uri: this.state.image.uri }} />
        </View>
      </ScrollView>
    );
  }
}

const Button2 = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 7.5,
    padding: 5,
    width: 75,
    height: 75
  }
});

// export default AddLocationScreen;
