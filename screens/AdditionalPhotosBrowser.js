import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { FileSystem } from 'expo';
import AdditionalPhotosTile from './AdditionalPhotosTile';

import * as firebase from "firebase";
const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: "Additional Location Photos"
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      photos: [],
      selected: {},
      key: "",
      name:"",
      venue:"",
      photosLocations: [],
      after: null,
      has_next_page: true
    }
    // console.log(props)
    console.log("photosLocations", this.state.photosLocations)
  }

  componentDidMount() {
  //   this.getPhotos()
  // }
  const { navigation } = this.props;
  const ref = firebase
    .firestore()
    .collection("locations")
    .doc(JSON.parse(navigation.getParam("Locationkey")));
  ref.get().then(doc => {
    if (doc.exists) {
      const location = doc.data();
      console.log(location.photosLocations)
      this.setState({
        key: doc.id,
        name: location.name,
        venue: location.venue,
        photosLocations: location.photosLocations,
        isLoading: false
      })
      // .then(() => {console.log("after location is set", this.state.photosLocations)})
    } else {
      console.log("No such document!");
    }
  });
}

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
  }

  getPhotos = () => {
    // let params = { first: 50, mimeTypes: ['image/jpeg'] };
    // if (this.state.after) params.after = this.state.after
    // if (!this.state.has_next_page) return
    // CameraRoll
    //   .getPhotos(params)
    //   .then((r) => this.processPhotos(r))
    console.log("photosLocations in getPhotos", this.state.photosLocations)
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
    this.props.callback(callbackResult)
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
      <AdditionalPhotosTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    )
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
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderImages()}
        <View style={styles.detailButton}>
          <Button
            medium
            backgroundColor={"#CCCCCC"}
            title="Back to Details"
            onPress={() => {
              this.props.navigation.navigate("LocationDetails", {
                Locationkey: `${JSON.stringify(this.state.key)}`
              });
            }}
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
  detailButton: {
    marginTop: 10
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
})
