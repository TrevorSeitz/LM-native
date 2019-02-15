import React, { Component } from "react";
import { Image, Alert, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class PrepMainPhoto extends Component {
constructor(props) {
  super(props)
console.log(this.props)
}
uploadMainImage = async (photo) => {
  const blob = await uriToBlob(photo.uri);

  var ref = firebase
    .storage()
    .ref()
    .child("images/" + photo.imageFileName);

  const snapshot = await ref.put(blob)
  ,then(() => this.saveMainPhoto(snapshot))
};

saveMainPhoto = ()=> {
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
}

return() {

}

}
