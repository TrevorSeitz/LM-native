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
import { Button } from "react-native-elements";

import {
  Location,
  FileSystem
} from "expo";
import shorthash from "shorthash"
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
      photos: [], // the photos on display for user to choose from
      additionalPhotos: [],  // The selected photos to be saved
      photosLocations:[], // the photos that are saved to the DB
      photosToCache: [],
      cachedPhotos: [],
      blobs: [],
      max: 4,
      selected: {},
      after: null,
      has_next_page: true,
      isLoading: false
    }
    var dbRef = firebase.firestore().collection("locations");

  }

  componentDidMount() {
    this._retrieveData()
    this.getPhotos()
  }

  getExtraPhotoList = () => {
    // retreive the Location information from the DB
    const { navigation } = this.props;
    const id = (this.state.key).replace(/"/g, '')
    console.log("id = ", id)
    // firebase
    //   .firestore()
    //   .collection("locations")
    dbRef
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            location: doc.data(),
            // key: doc.id,
            isLoading: false
          })
        } else {
          console.log("No such document!");
        }
      })
      .then(() => {
        this.setState({photosLocations: navigation.getParam("photosLocations") })
      }).then(() => {
        // Calculate the number of additional photos that can be chosen
        const currentMax = 4 - this.state.photosLocations.length
        this.setState({max: currentMax})
      })
  }

  _retrieveData = async () => {
    try {
      const key = await AsyncStorage.getItem("key");
      if (key !== null) {
        this.setState({ key: key });
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
    if (Object.keys(newSelected).length > this.state.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
  }

  saveImages = async (additionalPhotos) => {
    var promises = [];
    for(i=0;i<additionalPhotos.length;i++){
      promises.push(this.saveOneImage(additionalPhotos[i]))
    }

    Promise.all(promises)
      .then(() => {
        console.log("step 1 - saveImages promise -  this.state.blobs = ", this.state.blobs)
      })
      .then(() => {this.blobToSavedImage()})
  }

  saveOneImage = async (additionalPhoto) => {
      const blob = await this.uriToBlob(additionalPhoto)
      this.setState({
        blobs: [...this.state.blobs, blob]
      })
    // }
  }

  blobToSavedImage = async () => {
    var promises = [];
    let blobs = this.state.blobs
    // console.log("blobs length = ", blobs.length)
    for(i=0;i<blobs.length;i++) {
      promises.push(await this.uploadExtraImages(blobs[i]))
      // console.log("blob in loop = ", blobs[i])
    }

    Promise.all(promises)
      .then(() => {
        console.log("step 2 - blobToSavedImage promise - this.state.photosToCache = ", this.state.photosToCache)
      })
      .then(() => {
        this.combineImageArrays()
        // this.saveToFirestore()
      })
    }

combineImageArrays = () => {
  var promises = [];
  promises.push(
    this.setState(
      ({ photosLocations }) => ({ photosLocations: [...photosLocations, ...this.state.photosToCache]})
    )
  )
  Promise.all(promises)
  .then(() => {
    console.log("step 3 - combined arrays promise - this.state.photosLocations = ", this.state.photosLocations)
  })
  .then(() => {
    // this.combineImageArrays()
    this.saveToFirestore()
  })
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

  uploadExtraImages = async (blob) => {
    console.log("in uploadExtraImages")
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + blob._data.blobId.toString().split(".", 1).toString());
    // const id = (this.state.key).replace(/"/g, '')
console.log("before snapshot")
    const snapshot = await ref.put(blob);
console.log("before imageFileLocation")
    const imageFileLocation = await snapshot.ref
      .getDownloadURL()
      .then((result) => {
        this.setState(
          ({ photosToCache }) => ({ photosToCache: [...photosToCache, result] }))
          console.log("after result save")
      })
      .catch(error => {
        Alert.alert(error);
      })
  };

  saveToFirestore = async () => {
    var promises = [];
    const id = (this.state.key).replace(/"/g, '')
    const updateRef = firebase
      .firestore()
      .collection("locations")
      .doc(id)
    promises.push(
      updateRef
        .update({
          photosLocations: this.state.photosLocations
          })
        .then(() => {
          this.setState({
            isLoading: false
          });
        })
    )

    Promise.all(promises)
      .then(() => {
        console.log("step 4 - saveToFirestore  promise - this.state.photosLocations = ", this.state.photosLocations)
      })
      .then(() => {
        this.props.navigation.push("EditAdditionalPhotos", {
          photosLocations: this.state.photosLocations
        })
      })
  }

// Get photos from device camera roll
  getPhotos = () => {
    let params = { first: 50, mimeTypes: ['image/jpeg'] };
    if (this.state.after) params.after = this.state.after
    if (!this.state.has_next_page) return
    CameraRoll
      .getPhotos(params)
      .then((r) => this.processPhotos(r))
  }

// Process photos for display
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
    this.setState({
      isLoading: true
    });
    let promises = [];
    const { selected, photos, blobs } = this.state;
    const selectedPhotos = photos.filter((item, index) => {
      return(selected[index])
    });
    promises.push(this.saveImages(selectedPhotos))

    Promise.all(promises)
      .then(() => {console.log("first/Main promise complete??!!")})
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
            key: `${JSON.stringify(this.state.key)}`
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
