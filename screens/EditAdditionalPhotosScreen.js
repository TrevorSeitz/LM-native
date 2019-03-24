import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native';
import { FileSystem } from 'expo';
import shorthash from "shorthash"
import { Button } from "react-native-elements";
import ImageTile from './ImageTile';
import AdditionalPhotosTile from './AdditionalPhotosTile';
import * as firebase from "firebase";
import AdditionalImageBrowser from './AdditionalImageBrowser';
import SaveMainPhoto from '../components/SaveMainPhoto'
import CacheImage from "../components/CacheImage"


const { width } = Dimensions.get('window')

export default class EditAdditionalPhotosScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      maxPhotos: 4,
      photos: [],
      selected: {},
      toDelete: [],
      key: "",
      name:"",
      venue:"",
      photosLocations: [],  //need to get this from navigate.getParam
      cachedPhotos: [],
      after: null,
      has_next_page: true,
    }
  }

  componentDidMount() {
    this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      // console.log("edit phot value = ", value)
        this.setState({ key: value });
    } catch (error) {
    }
      this.getPhotos()
  };

  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem("key", this.state.key);
  //   } catch (error) {}
  // };

  selectImage = (index) => {
    let newSelected = {...this.state.selected};
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true
    }
    if (Object.keys(newSelected).length > this.props.max) return;
    if (!newSelected) newSelected = {};
    this.setState({ selected: newSelected })
    // create array of indexes to be deleted
    let toDelete = Object.keys(newSelected)

    this.setState({ toDelete })
  }


// Does Not delete from DB
  deleteSelected = async () => {
    let currentPhotos = [...this.state.photosLocations]
    let toDelete = this.state.toDelete
    // delete selected photos
    for (let i = toDelete.length-1; i >= 0; i--) {
      let del = toDelete[i]
      currentPhotos.splice(del, 1)
    }
    await this.setState({ photosLocations: currentPhotos })

    this.deleteFromDB()

    const photos = this.state.photosLocations
    for (let location of photos) {
      this.cacheImage(location)
    }

    this.setState({selected: {}})
  }

// This should be used both for delete and add
  deleteFromDB = () => {
    const id = (this.state.key).replace(/"/g, '')
    firebase
      .firestore()
      .collection("locations")
      .doc(id)
      .update({
        photosLocations: this.state.photosLocations
        })
      .then(() => {
        this._storeData()
      })
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.navigation.back
      })
  }

  getPhotos = () => {
    const { navigation } = this.props;
    const id = (this.state.key).replace(/"/g, '')
    firebase
      .firestore()
      .collection("locations")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const location = doc.data();
          this.setState({
            // key: doc.id,
            name: location.name,
            venue: location.venue,
            photosLocations: navigation.getParam("photosLocations"),
          })
        } else {
        console.log("No such document!");
        }
    })
      .then(() => {
      const photos = this.state.photosLocations
      for (let location of photos) {
        this.cacheImage(location)
      }
    })
      this.forceUpdate()
  }

  cacheImage = async (uri) => {
    const name = shorthash.unique(uri)
    const path = `${FileSystem.cacheDirectory}${name}`
    const image = await FileSystem.getInfoAsync(path)

    if (image.exists) {
      this.setState({
        cachedPhotos: [...this.state.cachedPhotos, image.uri]
      })
      return
    }
    const newImage = await FileSystem.downloadAsync(uri, path)
    this.setState({
      cachedPhotos: [...this.state.cachedPhotos, image.uri]
    })
  }

  getItemLayout = (data, index) => {
    let length = width/2;
    return { length, offset: length * index, index }
  }

  prepareCallback() {
    let { selected, photos } = this.state;
    let selectedPhotos = photos.filter((item, index) => {
      return(selected[index])
    });

    let files = selectedPhotos
      .map(i => FileSystem.getInfoAsync(i, {md5: true}))
    let callbackResult = Promise
      .all(files)
      .then(imageData=> {
        return imageData.map((data, i) => {
          return {file: selectedPhotos[i], ...data}
        })
      })
    this.props.callback(callbackResult)
  }

  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <AdditionalPhotosTile
        style={{opacity: selected ? 0.5 : 1}}
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
  }

  additionalImageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        AdditionalImageBrowserOpen: false,
        photos: photos
      })
    })
    .catch((e) => console.log(e))
  }

  addMorePhotos = () => {
    this.props.navigation.push("AdditionalImageBrowser", {
      photosLocations: this.state.photosLocations
    });
  }

  renderImages() {
    const length = this.state.cachedPhotos.length ? this.state.cachedPhotos.length : 0
    return(
    <View>
      <Text style={styles.name}>{this.state.name}</Text>
      <Text style={styles.note}>{length} of {this.state.maxPhotos} saved</Text>
    <FlatList
        data={this.state.photosLocations}
        numColumns={2}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReachedThreshold={0.5}
        initialNumToRender={this.state.maxPhotos}
        getItemLayout={this.getItemLayout}
      />
    </View>
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
    if (this.state.AdditionalImageBrowserOpen) {
      return(<AdditionalImageBrowser max={(this.state.maxPhotos - this.state.photosLocations.length)} callback={this.additionalImageBrowserCallback}/>);
    }
    const selectedPhotos = Object.keys(this.state.selected)
    return (
      <View style={styles.container}>
        {this.renderImages()}
        <View style={styles.detailButton}>

        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#999999"}
            color={"#FFFFFF"}
            title="Add MorePhotos"
            disabled={(this.state.photosLocations.length >= this.state.maxPhotos)} onPress={() => this.addMorePhotos()}/>
        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#999999"}
            color={"#FFFFFF"}
            title="Delete Selected"
            disabled={(selectedPhotos.length == 0)} onPress={() => this.deleteSelected()}
          />
        </View>
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
    padding: 10,
    marginTop: 20
  },
  detailButton: {
    marginTop: 10
  },
  name: {
    fontSize: 36,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 5,
    padding: 5,
    width: 300,
    height: 300
  },
})
