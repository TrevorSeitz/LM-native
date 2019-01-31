import React, { Component } from "react";
import * as firebase from "firebase";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import Expo, { Constants, Permissions, Camera, MediaLibrary } from "expo";

class LMImagePickerScreen extends Component {
  state = {
    rollGranted: false,
    cameraGranted: false
  };

  componentDidMount() {
    this.getCameraPermissions();
  }

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ cameraGranted: true });
    } else {
      this.setState({ cameraGranted: false });
      console.log("Uh oh! The user has not granted us permission.");
    }
    this.getCameraRollPermissions();
  }

  async getCameraRollPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      this.setState({ rollGranted: true });
    } else {
      console.log("Uh oh! The user has not granted us permission.");
      this.setState({ rollGranted: false });
    }
  }

  takePictureAndCreateAlbum = async () => {
    console.log("tpaca");
    const { uri } = await this.camera.takePictureAsync();
    console.log("uri", uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log("asset", asset);

    uploadImage = async (uri, imgName) => {
      // const response = await fetch(uri);
      // const blob = await response.blob();
      //
      // var metadata = {
      //   contentType: "image/jpeg"
      // };

      // blob.type = "photo";

      uriToBlob = url => {
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

      console.log("blob", blob);
      var ref = await firebase
        .storage()
        .ref()
        .child("images/" + imgName)
        .put(blob);

      // return ref.put(blob).then(function(snapshot) {
      //   console.log("Uploaded a blob or file!");
      // });
      // .type(fileType);
      // blob.type = "photo";
      // return ref.put(blob);

      // console.log("blob done");
    };

    uploadImage(uri, asset.filename)
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });

    MediaLibrary.createAlbumAsync("Expo", asset)
      .then(() => {
        Alert.alert("Album created!");
      })
      .catch(error => {
        Alert.alert("An Error Occurred!");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          type={Camera.Constants.Type.back}
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
        />
        <TouchableOpacity
          onPress={() =>
            this.state.rollGranted && this.state.cameraGranted
              ? this.takePictureAndCreateAlbum()
              : Alert.alert("Permissions not granted")
          }
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Snap</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LMImagePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center"
  },
  button: {
    width: 200,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: "#fff"
  },
  buttonText: {
    fontSize: 24,
    color: "#fff"
  }
});
