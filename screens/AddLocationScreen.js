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
  // TextInput,
  AsyncStorage,
  FlatList
} from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
// import { MaterialIcons } from "@expo/vector-icons";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  Location,
  MediaLibrary
} from "expo";
import ImageBrowser from "./ImageBrowser";
// import SaveExtraPhoto from '../components/SaveExtraPhoto'
import SaveMainPhoto from "../components/SaveMainPhoto";

export default class AddLocationScreen extends Component {
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
    this.ref = firebase.firestore().collection("locations");
    var storage = firebase.storage();
    var storageRef = storage.ref();
    // let storageRef = FIRStorage.reference().child("images/")
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: 1,
      quality: 0.25,
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
    result.exif.GPSLatitude = JSON.stringify(
      this.state.location.coords.latitude
    );
    result.exif.GPSLongitude = JSON.stringify(
      this.state.location.coords.longitude
    );
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
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });

    this.setState({
      isLoading: false
    });
  }

  saveImages = async () => {
    this.setState({
      isLoading: true
    });
    let allLocalPhotos = [...this.state.photos];
    // add the main photo to the array of extra photos
    allLocalPhotos.push(this.state.image.uri);

    // use for loop to send each phot to storage in order
    for (let i = 0; i < allLocalPhotos.length; i++) {
      if (allLocalPhotos[i].file) {
        // console.log("in the loop for extra photos: ", i);
        await this.uploadExtraImage(allLocalPhotos[i]);
      } else {
        // console.log("in the loop for MAIN photos: ", i);
        this.uploadMainImage(allLocalPhotos[i]);
      }
    }
  };

  uploadExtraImage = async photo => {
    let extraPhotosArray = [...this.state.photosLocations];
    const blob = await this.uriToBlob(photo.file);
    var ref = firebase
      .storage()
      .ref()
      .child(
        "images/" +
          photo.modificationTime
            .toString()
            .split(".", 1)
            .toString()
      );
    const snapshot = await ref.put(blob);
    const imageFileLocation = snapshot.ref
      .getDownloadURL()
      .then(result => {
        this.setState(prevState => ({
          photosLocations: [...prevState.photosLocations, result]
        }));
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  uploadMainImage = async uri => {
    const blob = await this.uriToBlob(uri);
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + this.state.imageFileName);
    const snapshot = await ref.put(blob);
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then(result => this.setState({ imageFileLocation: result }))
      .then(() => this.saveLocation())
      .then(() => {
        this.setState({
          isLoading: true
        });
      })
      .then(() => Alert.alert("Success!"))
      .catch(error => {
        Alert.alert(error);
      });
  };

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

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        this.setState({
          imageBrowserOpen: false,
          photos: photos
        });
      })
      .catch(e => console.log(e));
  };

  renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 75, width: 75 }}
        source={{ uri: item.file }}
        key={i}
      />
    );
  };

  renderAdditionalImages = () => {
    return (
      <View style={styles.container}>
        <View style={styles.photoList}>
          <Image style={styles.image} source={{ uri: this.state.image.uri }} />
          {this.state.photos.map((item, i) => this.renderImage(item, i))}
        </View>
        <View style={styles.buttonSubContainer}>
          <Button
            type="solid"
            small
            title="Add More Photos"
            onPress={() => this.setState({ imageBrowserOpen: true })}
          />
        </View>
        <View style={styles.buttonSubContainer}>
          <Button large title="Save" onPress={() => this.saveImages()} />
        </View>
      </View>
    );
  };

  renderGetMainImage = () => {
    return (
      <View>
        <Text style={styles.buttonText}>Add Main Photo</Text>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <Button2 onPress={this.selectPicture}>Gallery</Button2>
          </View>
          <View style={{ flex: 1 }}>
            <Button2 onPress={this.takePicture}>Take Picture</Button2>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let bottomForm;
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (this.state.image.uri) {
      bottomForm = this.renderAdditionalImages();
    } else {
      bottomForm = this.renderGetMainImage();
    }

    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={4} callback={this.imageBrowserCallback} />;
    }

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
        {bottomForm}
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
    flex: 1
    // padding: 10
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  subContainer: {
    flex: 1,
    marginBottom: 5,
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC"
  },
  buttonSubContainer: {
    flex: 1,
    marginBottom: 2,
    padding: 2
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
    fontSize: 15,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 25,
    // flexDirection: "row",
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
    width: 95
  },
  photoList: {
    flexDirection: "row",
    // marginTop: 2,
    // marginBottom: 2.5,
    padding: 5,
    height: 95,
    // flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  }
});
