import React, { Component } from "react";
import { Image, Alert, AsyncStorage } from "react-native";
import * as firebase from "firebase";
import firestore from "firebase/firestore";

export default class SaveExtraPhoto extends Component {
constructor(props) {
  super(props)
console.log(this.props)
}

  mapExtraPhotos = () => {
    console.log("inside mapExtraPhotos")
    let allPhotos = this.state.photos
    allPhotos.map((photo) => {
      console.log("extra photo: ", photo)
      this.uploadExtraImage(photo)
    })
  }

  uploadExtraImage = async (photo) => {
    console.log("inside uploadExtraImage")
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

    const blob = await uriToBlob(photo.file);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + photos.modificationTime.toString().split(".", 1).toString());
    const snapshot = await ref.put(blob);
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then((result) => {
        let extraPhotosArray = [...state.photosLocations, result]
        this.setState({ photosLocations: extraPhotosArray})
      })
      .catch(error => {
        Alert.alert(error);
      });
  };
  return() {
    console.log("inside SaveExtraPhoto")
    // this.mapExtraPhotos()
  }

}
