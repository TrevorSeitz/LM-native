import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Text,
  CameraRoll,
  FlatList,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Button, Icon } from "react-native-elements";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  Location,
  MediaLibrary,
  FileSystem
} from "expo";
import ImageTile from './ImageTile';
import * as firebase from "firebase";

const { width } = Dimensions.get('window')

export default class AdditionalImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      key: "",
      location: {},
      list: [],
      photos: [], // the photos on display for user to choose from
      additionalPhotos: [],
      uploadExtraImage: [],
      photosLocations:[],
      max: 4,
      selected: {},
      after: null,
      has_next_page: true,
      isLoading: false
    }
    console.log("additioanal Image Browser Props: ", this.props)
    this.ref = firebase.firestore().collection("locations");
  }

  componentDidMount() {
    this._retrieveData()
    this.getPhotos()
  }

  getExtraPhotoList = () => {
    const { navigation } = this.props;
    const id = (this.state.key).replace(/"/g, '')
    console.log("getExtraPhotoList id: ", id)
    firebase
      .firestore()
      .collection("locations")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            location: doc.data(),
            key: doc.id,
            isLoading: false
          })
        } else {
          console.log("No such document!");
        }
      })
      .then(() => {
        this.setState({photosLocations: this.state.location.photosLocations })
      }).then(() => {
        const currentMax = 4 - this.state.location.photosLocations.length
        this.setState({max: currentMax})
        console.log(this.state.max)
      })
      .then(() => console.log("getExtraPhotoList photosLocations: ", this.state.photosLocations))


  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
    try {
      const key = await AsyncStorage.getItem("key");
      if (key !== null) {
        this.setState({ key: key });
        console.log("this is the retrieved key", this.state.key)
      }
    } catch (error) {}

    this.getExtraPhotoList()
  };

  selectImage = (index) => {
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    // if (Object.keys(newSelected).length > this.state.max) return;
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
  }

  saveImages = async (additionalPhotos) => {
    this.setState({
      isLoading: true
    });
    // add the new photos uris to working array
    // use for loop to send each photo to storage in order
    for (let i = 0; i < additionalPhotos.length; i++) {
      const blob = await this.uriToBlob(additionalPhotos[i])
      await this.uploadExtraImage(blob)
    }
    // at this point, we have an array of the old photos and the new in this.state.photosLocations
    // next, we must up the photoLocations array in the locations document with this array
  }

  uriToBlob = (uri)=> {
    if (uri != undefined){
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
  }
  };

  uploadExtraImage = async (blob) => {
    console.log("photo inside uploadExtraImage:", blob)
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + blob._data.blobId.toString().split(".", 1).toString());
    const snapshot = await ref.put(blob);

    const id = (this.state.key).replace(/"/g, '')
    console.log("this.key: ", (this.state.key).replace(/"/g, ''));
    console.log("id: ", id);
    const imageFileLocation = snapshot.ref
      .getDownloadURL()
      .then((result) => {
          this.setState(
            ({ photosLocations }) => ({ photosLocations: [...photosLocations, result] }))
      })
      .catch(error => {
        Alert.alert(error);
      })
      .then(() => console.log("this.state.photosLocations: ", this.state.photosLocations ))
      .then(() => console.log("doc: ", id))
      .then(() => {
        const updateRef = firebase
          .firestore()
          .collection("locations")
          .doc(id)
        updateRef
          .update({
            photosLocations: this.state.photosLocations
            })
          .then(() => {
            this.setState({
              isLoading: false
            });
          })
      })
      .then(() => {
        console.log("we should be going to last screen")
        this.props.navigation.push("AdditionalPhotos", {
          Locationkey: `${JSON.stringify(this.state.key)}`
        })
      })
  };

  saveLocation() {
    firebase
    .firestore()
    .collection("locations")
    .doc(this.state.key)
    .get()
    .then(() => console.log("this is the input document id: ", this.state.key))
    .catch(error => {
      console.error("Error adding document: ", error);
    });
    this.setState({
      isLoading: false
    });
  }

  getPhotos = () => {
    let params = { first: 50, mimeTypes: ['image/jpeg'] };
    if (this.state.after) params.after = this.state.after
    if (!this.state.has_next_page) return
    CameraRoll
      .getPhotos(params)
      .then((r) => this.processPhotos(r))
  }

  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    let uris = r.edges.map(i=> i.node).map(i=> i.image).map(i=>i.uri)
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  }

  getItemLayout = (data, index) => {
    let length = width/4;
    return { length, offset: length * index, index }
  }

  finishSavingPhotos = () => {
    console.log("inside finishSavingPhotos")
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      return(selected[index])
    });
      // send selectedPictures to be saved
    this.saveImages(selectedPhotos)
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText = selectedCount + ' Selected';
    if (selectedCount === this.state.max) headerText = headerText + ' (Max)';
    return (
      <View style={styles.header}>
        <Button
          title="Exit"
          onPress={() => this.props.navigation.navigate("Details", {
            Locationkey: `${JSON.stringify(this.state.key)}`
          })}
        />
        <Text>{headerText}</Text>
        <Button
          title="Choose"
          onPress={() => this.finishSavingPhotos()}
        />
      </View>
    )
  }

  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
  }
  renderImages() {
    return(
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 20
  },
})
