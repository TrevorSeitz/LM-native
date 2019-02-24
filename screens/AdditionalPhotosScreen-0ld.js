import React, { Component } from "react";
import {
  StyleSheet,
  View,
  CameraRoll,
  FlatList,
  Dimensions
} from 'react-native';
import { List, ListItem, Text, Button } from "react-native-elements";
import { FileSystem } from 'expo';
import AdditionalPhotosTile from './AdditionalPhotosTile';
import * as firebase from "firebase";

const { width } = Dimensions.get('window')

export default class AdditionalPhotosScreen extends Component {
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
      // after: null,
      // has_next_page: true
    }
  }

  componentDidMount() {
  const { navigation } = this.props;
  firebase
    .firestore()
    .collection("locations")
    .doc(JSON.parse(navigation.getParam("Locationkey")))
    .get()
    .then(doc => {
    if (doc.exists) {
      const location = doc.data();
      console.log("Location data: ", location)
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

  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <AdditionalPhotosTile
        item={item}
        index={index}
        selected={selected}
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
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    </View>
    )
  }

  render() {
    // add loading spinner - copy from LocationDetailsScreen
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
    padding: 20
  },
  detailButton: {
    marginTop: 10
  },
})
