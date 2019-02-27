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
      uid: this._retrieveData(),
      list: [],
      photos: [], // the photos on display for user to choose from
      additionalPhotos: [],
      uploadExtraImage: [],
      photosLocations:[],
      selected: {},
      after: null,
      has_next_page: true
    }
    this.ref = firebase.firestore().collection("locations");
  }

  componentDidMount() {
    this.getPhotos()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  selectImage = (index) => {
    console.log(this.state.selected)
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
      console.log(this.state.selected)
  }

  saveImages = async (additionalPhotos) => {
  console.log("in saveImages: ", additionalPhotos)
    this.setState({
      isLoading: true
    });
    // add the new photos uris to working array
    // use for loop to send each photo to storage in order
    for (let i = 0; i < additionalPhotos.length; i++) {
      await this.uploadExtraImage(additionalPhotos[i])
    }
  }

  uriToBlob = (uri)=> {
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

  uploadExtraImage = async (photo) => {
    let extraPhotosArray = [...this.state.photosLocations]
    const blob = await this.uriToBlob(photo);
    console.log("upload extra image blob 1: ", blob)
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + blob._data.blobId.toString().split(".", 1).toString());
    const snapshot = await ref.put(blob);
    const imageFileLocation = snapshot.ref
      .getDownloadURL()
      // .then((result) => {console.log("Result 2:", result)})
      .then((result) => {
          this.setState(
            ({ photosLocations }) => ({ photosLocations: [...photosLocations, result] }))
      })
      .then(() => {
        console.log("this.state.photosLocations 3: ", this.state.photosLocations)
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

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

  prepareCallback() {
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      // console.log(selected[index])
      return(selected[index])
    });
      // console.log("selected photos from image browser: ", selectedPhotos)
    let files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    let callbackResult = Promise
      .all(files)
      .then(imageData=> {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data}
        })
      })
      //  selected photos holds the uri of the selected photos
      .then(() => console.log(selectedPhotos))
      .then(() => this.saveImages(selectedPhotos))
    // this.props.callback(callbackResult)
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
