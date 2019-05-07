import React from "react";
import { Image, Alert } from "react-native";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class PrepMainPhoto extends React.Component {
  constructor(props) {
    super(props);
  }
  uploadMainImage = async photo => {
    const blob = await uriToBlob(photo.uri);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + photo.imageFileName);

    const snapshot = await ref
      .put(blob)
      .then(() => this.saveMainPhoto(snapshot));
  };

  saveMainPhoto = () => {
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then(result => this.setState({ imageFileLocation: result }))
      .then(() => this.saveLocation())
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  return() {}
}
