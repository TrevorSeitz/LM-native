import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
const { width } = Dimensions.get("window");

export default class ShowAdditionalPhotosTile extends React.PureComponent {
  showImage = (index, photos) => {
    console.log(index);
    return (
      <Image
        style={{ width: "100%", resizeMode: "stretch" }}
        source={{ uri: photos[index] }}
      />
    );
  };

  render() {
    let { item, index, photos, navigation, navigate } = this.props;
    // console.log("this.props: ", this.props);
    // console.log("SAPT navigate: ", navigate);

    // const { navigate } = this.props.navigation;
    if (!item) return null;
    return (
      <TouchableHighlight
        onPress={() =>
          navigate("AdditionalPhotosGallery", {
            index: index,
            photos: photos
          })
        }
      >
        <Image
          style={{ width: width / 2, height: width / 2 }}
          source={{ uri: photos[index] }}
        />
      </TouchableHighlight>
    );
  }
}
