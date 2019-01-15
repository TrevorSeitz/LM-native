import * as React from "react";
import { AppRegistry, TextInput, Text, View, StyleSheet } from "react-native";
import { Constants, MapView } from "expo";

export default class NewPlaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos"
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        //Error Loading Images
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <Text>This is the place for the New Place Form</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }
}
