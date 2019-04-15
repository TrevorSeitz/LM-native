import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { FileSystem, Icon } from "expo";
import GallerySwiper from "react-native-gallery-swiper";
import * as firebase from "firebase";

export default class AdditionalPhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.navigation.state.params.index,
      photos: this.props.navigation.state.params.photos
    };
    // console.log("This.props.navigation: ", this.props.navigation);
    // console.log(this.state);

    this.index = this.state.index;
  }

  leftArrow = () => {
    // this.setState({
    // index: this.state.index - 1
    // });
    console.log("left");
    if (this.index > 0) {
      this.index--;
      console.log(this.index);
      this.setState({
        index: this.index
      });
    }
  };

  rightArrow = () => {
    // this.setState({
    // index: this.state.index - 1
    // });
    // console.log("right");
    if (this.index < this.state.photos.length - 1) {
      this.index++;
      // console.log(this.index);
      this.setState({
        index: this.index
      });
    }
  };

  render() {
    const photos = this.state.photos;
    let uri = photos[this.index];
    let index = this.index;
    let dimensions = Dimensions.get("window");
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;
    // console.log("photos[index]: ", photos[index]);

    this.imageURL = this.state.photos[index];
    return (
      <View style={styles.imageBox}>
        <View>
          <Image
            style={{ height: imageHeight, width: imageWidth }}
            source={{ uri: this.imageURL }}
          />
        </View>
        <TouchableOpacity
          style={styles.touchableAreaLeft}
          onPress={this.leftArrow}
        >
          <Icon.Ionicons name="ios-arrow-dropleft" style={styles.leftButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableAreaRight}
          onPress={this.rightArrow}
        >
          <Icon.Ionicons
            name="ios-arrow-dropright"
            style={styles.rightButton}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchableAreaLeft: {
    // flex: 1,
    // flexDirection: "row",
    // marginBottom: 5,
    opacity: 1,
    fontSize: 40,
    width: 80,
    height: 80,
    position: "absolute",
    // backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    left: 10
    // right: 0,
    // bottom: 0
  },
  leftButton: {
    // color: "#254117",
    // flex: 1,
    // marginBottom: 5,
    opacity: 1,
    fontSize: 40,
    width: 40,
    height: 40,
    position: "absolute",
    // bottom: 0,
    // left: 0,
    color: "#FFFFFF",
    alignItems: "center"
    // justifyContent: "center"
    // left: 0
    // bottom: -50
  },
  touchableAreaRight: {
    // flex: 1,
    // flexDirection: "row",
    // marginBottom: 5,
    opacity: 1,
    fontSize: 40,
    width: 80,
    height: 80,
    position: "absolute",
    // backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    // left: 10
    right: 10
    // bottom: 0
  },
  rightButton: {
    // color: "#254117",
    // flex: 1,
    // marginBottom: 5,
    opacity: 1,
    fontSize: 40,
    width: 40,
    height: 40,
    position: "absolute",
    // bottom: 0,
    // left: 0,
    color: "#FFFFFF",
    alignItems: "center"
    // justifyContent: "center"
    // left: 0
    // bottom: -50
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 5,
    padding: 5
    // width: auto,
    // height: auto
  },
  imageBox: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
