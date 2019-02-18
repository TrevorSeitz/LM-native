import React, { Component } from "react";
import { Image, Alert, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class SaveMainPhoto extends Component {
constructor(props) {
  super(props)
console.log(this.props)
}

  uploadMainImage = async (uri) => {
    // const uri = this.state.image.uri;
    uriToBlob = uri => {
      console.log("uritoblob uri:", uri)
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
      .child("images/" + this.state.imageFileName);
    const snapshot = await ref.put(blob);
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then(result => this.setState({ imageFileLocation: result }))
      .then(() => this.saveLocation())
      .then(() => Alert.alert("Success!"))
      .catch(error => {
        Alert.alert(error);
      });
  };

}
