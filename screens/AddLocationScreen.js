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
  TextInput,
  AsyncStorage,
  FlatList
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
  Location,
  MediaLibrary
} from "expo";
import ImageBrowser from './ImageBrowser';


export default class AddLocationScreen extends Component {
  static navigationOptions = {
    title: "Add Location"
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: this._retrieveData(),
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
      photos: [],
      photosLocations: [],
      imageBrowserOpen: false,
      isLoading: false
    };
    //
    // this._retrieveData();

    this.ref = firebase.firestore().collection("locations");
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATIONS);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({})
      .then
      // console.log("get location", location)
      ();
    this.setState({ location });
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: 1,
      quality: 0.5,
      exif: true
    });
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
    }).then(await this._getLocationAsync());
    const metadata = result.metadata;
    // console.log("state.location", this.state.location);

    result.exif.GPSLatitude = JSON.stringify(
      this.state.location.coords.latitude
    );
    result.exif.GPSLongitude = JSON.stringify(
      this.state.location.coords.longitude
    );
    // console.log("result", result);
    this.processImage(result, metadata);
  };

  processImage = async (result, metadata) => {
    if (!result.cancelled) {
      this.setState({ image: result });
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      let lat = parseFloat(result.exif.GPSLatitude, 5);
      let long = parseFloat(result.exif.GPSLongitude, 5);
      if (result.exif.GPSLatitudeRef == "S") {
        lat *= -1;
      }
      if (result.exif.GPSLongitudeRef == "W") {
        long *= -1;
      }

      this.setState({
        imageFileName: asset.filename,
        latitude: lat,
        longitude: long
      });
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
    this.ref
      .add({
        uid: this.state.uid,
        name: this.state.name,
        venue: this.state.venue,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        contactName: this.state.contactName,
        contactPhone: this.state.contactPhone,
        email: this.state.email,
        description: this.state.description,
        photosLocations: this.state.photosLocations,
        image: this.state.image,
        imageFileName: this.state.imageFileName,
        imageFileLocation: this.state.imageFileLocation
      })
      .then(docRef => {
        this.setState({
          uid: "",
          name: "",
          venue: "",
          latitude: "",
          longitude: "",
          contactName: "",
          contactPhone: "",
          email: "",
          description: "",
          photos: [],
          photosLocations: [],
          image: "nil",
          imageFileName: "",
          imageFileLocation: "",
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

  prepareImages = async () => {
    let extraPhotos = []
    let allPhotos = this.state.photos
    allPhotos.push(this.state.image.uri)
    // console.log("all photos from prepareImages: ", allPhotos)
    allPhotos.map((item, i) => {
      if (i < (allPhotos.length-1)) {
        this.uploadImage(item, extraPhotos)
      } else {
        this.uploadMainImage(item)
      }
    })
  }

sortUris = (photo) => {
  if (photo.exists) {
    this.uploadMainImage(this.state.image.uri)
  } else {
    this.uploadImage(photo)
  }
}

uriToBlob = uri => {
  console.log("uriToBlob: ", uri)
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

  uploadImage = async (photo, extraPhotos) => {
    let uri = photo.file
      console.log("extra photos state: ", this.state.photosLocations)
    // let extraPhotos = []
    const blob = await this.uriToBlob(uri);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + photo.modificationTime.toString().slice(".", 1));
    // console.log("extra filename: ", photo.modificationTime.toString().split(".", 1).toString().toString())
    const snapshot = await ref.put(blob);

    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then((result) => {if (result){ this.pushResult(result, extraPhotos)}})
      .then(() => { if (extraPhotos.length = this.state.photos.length) {
        this.setState({photosLocations: extraPhotos })
      }})
      .then((result) => console.log("extra photos array: ", this.state.photosLocations))
      // .then(() => console.log("imagefile: ", this.state.image))
      // .then(() => {if (this.state.latitude) {this.saveLocation(),
      // console.log("has latitude")
      //   Alert.alert("Success!")};
      // })
      .catch(error => {
        Alert.alert(error);
      });
  };

  pushResult = () => {
    if (result){ extraPhotos.push(result)}
  }

  uploadMainImage = async (uri) => {
    console.log("Main uri", uri)
    const blob = await this.uriToBlob(uri);

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + this.state.imageFileName);
    const snapshot = await ref.put(blob);
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then((result) => {this.setState({ imageFileLocation: result })})
      .then(() => console.log("Main imagefile location: ", this.state.imageFileLocation))
      .then(() =>  {this.saveLocation(),
        Alert.alert("Success!")}
      )
      .catch(error => {
        Alert.alert(error);
      });

  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        imageBrowserOpen: false,
        photos: photos
      })
    })
    .catch((e) => console.log(e))
  }

  renderImage = (item, i) => {
    return(
      <Image
        style={{height: 75, width: 75}}
        source={{uri: item.file}}
        key={i}
      />
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

      if (this.state.imageBrowserOpen) {
        return(<ImageBrowser max={4} callback={this.imageBrowserCallback}/>);
      }
    // this._retrieveData();
    // console.log("render uid:", this.state.uid);
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
          <Button large title="Save" onPress={() => this.prepareImages() } />
          <View style={styles.photoList}>
            <Image style={styles.image} source={{ uri: this.state.image.uri }} />
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </View>
          <Button type="button" small title="Add More Photos" disabled={!this.state.image.uri} onPress={() => this.setState({imageBrowserOpen: true})}/>
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
    marginBottom: 15,
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
    height: 35,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 2,
    marginTop: 2,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  image: {
    // flex: 1,
    alignItems: "stretch",
    width: 75
  },
  photoList: {
    flexDirection: 'row',
    marginTop: 2.5,
    marginBottom: 2.5,
    padding: 5,
    height: 85,
    // flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

// export default AddLocationScreen;
