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
  AsyncStorage
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

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: this._retrieveData(),
      name: "",
      Phone: "",
      email: "",
      avatar: "nil",
      avatarFileName: "",
      avatarFileLocation: "",
      isLoading: false
    };
    //
    // this._retrieveData();

    this.ref = firebase.firestore().collection("users");
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  onCollectionUpdate = querySnapshot => {
    const uid = this.state.uid;
    let user = {};
    this.ref
      .where("uid", "==", uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          const id = doc.data().id;
          const uid = doc.data().uid;
          const name = doc.data().name;
          const phone = doc.data().phone;
          const email = doc.data().email;
          const avatar = doc.data().avatar;
          const avatarFileName = doc.data().avatarFileName;
          const avatarFileLocation = doc.data().avatarFileLocation;
          locations.push({
            uid: uid,
            name: name,
            phone: phone,
            email: email,
            avatar: avatar,
            avatarFileName: avatarFileName,
            avatarFileLocation: avatarFileLocation
          });
        });
      })
      .then(() => {
        this.setState({ user: user });
      });
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
    }).then(await this.processImage(result, metadata));
  };

  processImage = async (result, metadata) => {
    if (!result.cancelled) {
      this.setState({ avatar: result });
      const asset = await MediaLibrary.createAssetAsync(result.uri);

      this.setState({
        avatarFileName: asset.filename
      });
    }
  };

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  saveuser() {
    this.setState({
      isLoading: true
    });
    this.ref
      .add({
        uid: this.state.uid,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        avatar: this.state.avatar,
        avatarFileName: this.state.avatarFileName,
        avatarFileLocation: this.state.avatarFileLocation
      })
      .then(docRef => {
        this.setState({
          uid: "",
          name: "",
          phone: "",
          email: "",
          avatar: "nil",
          avatarFileName: "",
          avatarFileLocation: "",
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

  uploadImage = async () => {
    const uri = this.state.avatar.uri;
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

    const blob = await uriToBlob(uri);

    var ref = firebase
      .storage()
      .ref()
      .child("avatars/" + this.state.avatarFileName);
    const snapshot = await ref.put(blob);
    const avatarFileLocation = await snapshot.ref
      .getDownloadURL()
      .then(result => this.setState({ avatarFileLocation: result }))
      .then(() => this.saveLocation())
      .then(() => {
        Alert.alert("Success!");
      })
      .catch(error => {
        Alert.alert(error);
      });
    // this.saveLocation();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
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
            placeholder={"Phone"}
            value={this.state.phone}
            onChangeText={text => this.updateTextInput(text, "phone")}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={"email"}
            value={this.state.email}
            onChangeText={text => this.updateTextInput(text, "email")}
          />
        </View>
        <View style={styles.container}>
          <Text>Get/Change Avatar</Text>
          <Button2 onPress={this.selectPicture}>Gallery</Button2>
          <Button2 onPress={this.takePicture}>Take Picture</Button2>
        </View>
        <View style={styles.container}>
          <Button large title="Save" onPress={() => this.uploadImage()} />
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
    marginBottom: 20,
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
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  avatar: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 7.5,
    padding: 5,
    width: 75,
    height: 75
  }
});

// export default AddLocationScreen;
