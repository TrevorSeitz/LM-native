import React, { Component } from "react";
import { Image, Alert, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class SaveExtraPhoto extends Component {
constructor(props) {
  super(props)
console.log(this.props)
}

  uploadExtraImage = async (photo) => {
    const uri = photo.uri;
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
      .child("images/" + photos.modificationTime.toString().split(".", 1));
    const snapshot = await ref.put(blob);
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then(result => {
         this.setState(state => {
           const photos = [...state.photos, result];
         });
       })
      .catch(error => {
        Alert.alert(error);
      });
  };

}
