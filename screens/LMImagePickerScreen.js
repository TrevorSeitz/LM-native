import React, { Component } from "react";
import * as firebase from "firebase";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { ImagePicker, Permissions, MediaLibrary } from "expo";

class LMImagePickerScreen extends Component {
  state = { image: "nil" };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: 1,
      quality: 0.5,
      exif: true
    });

    // console.log("result", result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    const asset = await MediaLibrary.createAssetAsync(result.uri);
    // console.log("asset", asset);

    this.uploadImage(result.uri, asset)
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });
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

    // console.log("result", result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    const asset = await MediaLibrary.createAssetAsync(result.uri);
    // console.log("asset", asset);

    this.uploadImage(result.uri, asset)
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  uploadImage = async (uri, asset) => {
    uriToBlob = url => {
      // console.log("bloburl", url);
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response);
          }
        };
        xhr.open("GET", url);
        xhr.responseType = "blob"; // convert type
        xhr.send();
      });
    };

    const blob = await uriToBlob(uri);
    // console.log("blob", blob);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + asset.filename)
      .put(blob);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View style={styles.row}>
          <Button onPress={this.selectPicture}>Gallery</Button>
          <Button onPress={this.takePicture}>Take Picture</Button>
        </View>
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
    alignItems: "center",
    justifyContent: "center"
  }
});
