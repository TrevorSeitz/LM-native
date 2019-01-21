import React, { Component } from "react";
import * as firebase from "firebase";
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { Constants, ImagePicker, Permissions, MediaLibrary } from "expo";
import Exif from "react-native-exif";

import NewPlaceTextInput from "../components/NewPlaceTextInput";

class LMImagePickerScreen extends Component {
  // state = { image: "nil" };
  state = {
    image: "nil",
    name: "add name",
    address: "add address",
    email: "email"
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: 1,
      quality: 0.5,
      exif: true
    });
    // const uri = result.uri;
    // Exif.getExif(uri)
    //   .then(msg => console.warn("OK: " + JSON.stringify(msg)))
    //   .catch(msg => console.warn("ERROR: " + msg));
    //
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

      const asset = await MediaLibrary.createAssetAsync(result.uri);

      this.uploadImage(result, asset, metadata)
        .then(() => {
          Alert.alert("Success!");
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  uploadImage = async (result, asset) => {
    const uri = result.uri;
    uriToBlob = uri => {
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

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + asset.filename)
      .put(blob);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image.uri }} />
        <Button onPress={this.selectPicture}>Gallery</Button>
        <Button onPress={this.takePicture}>Take Picture</Button>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

export default LMImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  image: {
    flex: 1,
    alignItems: "stretch"
    // ,
    // width: 200,
    // height: 200
  }
});
