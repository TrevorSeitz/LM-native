import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  AsyncStorage,
  // Button
} from 'react-native';
import { FileSystem } from 'expo';import { Button } from "react-native-elements";
import ImageTile from './ImageTile';
import AdditionalPhotosTile from './AdditionalPhotosTile';
import * as firebase from "firebase";
import AdditionalImageBrowser from './AdditionalImageBrowser';
// import SaveExtraPhoto from '../components/SaveExtraPhoto'
import SaveMainPhoto from '../components/SaveMainPhoto'


const { width } = Dimensions.get('window')

export default class AdditionalPhotosScreen extends Component {
// possibly add navigation options with tab bar false

  constructor(props) {
    super(props);
    this.state = {
      // Locationkey: "",
      list: [],
      maxPhotos: 4,
      photos: [],
      selected: {},
      toDelete: [],
      key: "",
      name:"",
      venue:"",
      photosLocations: [],
      after: null,
      has_next_page: true
    }
      // this.getPhotos()
  }

  componentDidMount() {
    this.getPhotos()
    this._storeData()
  }

  _storeData = async (user) => {
    const { navigation } = this.props;
    try {
      await AsyncStorage.setItem("key", navigation.getParam("Locationkey"));
    } catch (error) {}
    // console.log("passed in key: ", navigation.getParam("Locationkey"))
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

  deleteSelected = () => {
    let currentPhotos = [...this.state.photosLocations]
    let toDelete = this.state.toDelete
    // delete selected photos
    for (let i = toDelete.length; i > 0; i--) {
      // console.log("index: ", i)
      let del = toDelete[i]
        // console.log("delete index number: ", del)
      currentPhotos.splice(del, 1)
    }
    console.log("currentPhotos: ", currentPhotos)
    console.log("photosLocations: ", this.state.photosLocations)
    console.log("key: ", this.state.key)
    this.setState({ photosLocations: currentPhotos })
    this.props.navigation.back
  }

  getPhotos = () => {
    const { navigation } = this.props;
    firebase
      .firestore()
      .collection("locations")
      .doc(JSON.parse(navigation.getParam("Locationkey")))
      .get()
      .then(doc => {
      if (doc.exists) {
        const location = doc.data();
        // console.log("Location photos: ", location.photosLocations)
        this.setState({
          key: doc.id,
          name: location.name,
          venue: location.venue,
          photosLocations: location.photosLocations,
          isLoading: false
        })
        } else {
        console.log("No such document!");
        }
      });
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
        AdditionalimageBrowserOpen: false,
        photos: photos
      })
    })
    .catch((e) => console.log(e))
  }

  renderImages() {
    return(
      <View>
      <Text>Location: {this.state.name}</Text>
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

      if (this.state.additionalImageBrowserOpen) {
        return(<AdditionalImageBrowser max={(this.state.maxPhotos - this.state.photosLocations.length)} callback={this.additionalImageBrowserCallback}/>);
      }
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
            title="Add MorePhotos" disabled={(this.state.photosLocations.length >= this.state.maxPhotos)} onPress={() => this.setState({additionalImageBrowserOpen: true})}/>
        </View>
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#999999"}
            color={"#FFFFFF"}
            title="Delete Selected"
            onPress={() => this.deleteSelected()}
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
})
