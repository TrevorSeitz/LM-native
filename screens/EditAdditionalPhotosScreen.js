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
  // Button
} from 'react-native';
import { FileSystem } from 'expo';import { Button } from "react-native-elements";
import ImageTile from './ImageTile';
import AdditionalPhotosTile from './AdditionalPhotosTile';
import * as firebase from "firebase";
import AdditionalImageBrowser from './AdditionalImageBrowser';
import SaveMainPhoto from '../components/SaveMainPhoto'


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
      if (value !== null) {
        this.setState({ key: value });
      }
    } catch (error) {
    }
      this.getPhotos()
  };

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

    this.setState({selected: {}})
  }

// This should be used both for delete and add
  deleteFromDB = () => {
    const id = this.state.key
    firebase
      .firestore()
      .collection("locations")
      .doc(id)
      .update({
        photosLocations: this.state.photosLocations
        })
      .then(() => {
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
          key: doc.id,
          name: location.name,
          venue: location.venue,
          photosLocations: navigation.getParam("photosLocations"),
        })
        } else {
        console.log("No such document!");
        }
      });
      this.forceUpdate()
      console.log("photosLocation: ", this.state.photosLocations)
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
    return(
      <View>
      <Text style={styles.name}>{this.state.name}</Text>
      <FlatList
        data={this.state.photosLocations}
        numColumns={2}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
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
    console.log("photosLocations: ", this.state.photosLocations)
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
  }
})
