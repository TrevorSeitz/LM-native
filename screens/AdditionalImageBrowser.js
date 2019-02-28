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
      list: [],
      photos: [], // the photos on display for user to choose from
      additionalPhotos: [],
      uploadExtraImage: [],
      photosLocations:[],
      selected: {},
      after: null,
      has_next_page: true,
      isLoading: false
    }
    // console.log("props: ", this.props)

    this.ref = firebase.firestore().collection("locations");
  }

  componentDidMount() {
    this.getPhotos()
    this._retrieveData()
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

    // console.log("uid: ", this.state.uid)
    // console.log("key: ", this.state.key)
  };

  selectImage = (index) => {
    // console.log(this.state.selected)
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
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
          // .get()
          // .then(() => console.log("this is the input document id inside uploadExtraImage: ", this.state.key))
          .then(() => console.log("update should be done"))
      })
  };

  saveLocation() {
    console.log("in save location")
    console.log("additionalPhotos: ", this.state.additionalPhotos)
    console.log("uploadExtraImage: ", this.state.uploadExtraImage)
    console.log("photosLocationsphotosLocations: ", this.state.photosLocationsphotosLocations)
    console.log("photosLocations: ", this.state.photosLocations)
    firebase
    .firestore()
    .collection("locations")
    .doc(this.state.key)
    .get()
    .then(() => console.log("this is the input document id: ", this.state.key))
    // .then((doc) => console.log("this should be the document: "), doc.id)
    // .update({
    //   photosLocations: this.state.photosLocations
    //   })
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
    // let fotos = r.map()
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

  prepareCallback = async () => {
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      // console.log(selected[index])
      return(selected[index])
    });
      // send selectedPictures to be saved
      await this.saveImages(selectedPhotos)
      // .then(() => {this.saveLocation()})


    let files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    let callbackResult = Promise
      .all(files)
      .then(imageData=> {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data}
        })
      })
  }

  renderHeader = () => {
    let selectedCount = Object.keys(this.state.selected).length;
    let headerText = selectedCount + ' Selected';
    if (selectedCount === this.props.max) headerText = headerText + ' (Max)';
    return (
      <View style={styles.header}>
        <Button
          title="Exit"
          onPress={() => this.props.callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Button
          title="Choose"
          onPress={() => this.prepareCallback()}
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
