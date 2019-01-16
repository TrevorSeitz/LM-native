import React, { Component } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";

// import * as React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { ImagePicker, Permissions } from "expo";

class LMImagePickerScreen extends Component {
  state = { image: "nil" };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspec: 1,
      allowsEditing: true
    });
    this.setState({ image: uri });
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    this.setState({ image: uri });
  };

  render() {
    // let { image } = this.state;

    // return (
    //   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //     <Button
    //       title="Pick an image from camera roll"
    //       onPress={this._pickImage}
    //     />
    //     {image && (
    //       <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
    //     )}
    //   </View>
    // );
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
// _pickImage = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     aspect: [4, 3]
//   });
//
//   console.log(result);
//
//   if (!result.cancelled) {
//     this.setState({ image: result.uri });
//   }
// };
// }

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
