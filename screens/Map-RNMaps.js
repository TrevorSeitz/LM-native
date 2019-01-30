import * as React from "react";
import MapView from "react-native-maps";
import { Platform, Text, View, StyleSheet } from "react-native";
// import { Constants, MapView, Location, Permissions } from "expo";
import { Constants, Location, Permissions } from "expo";

import { Card } from "react-native-paper";

export default class Map extends React.Component {
  // state = {
  //   location: null,
  //   errorMessage: null
  // };
  //
  // componentWillMount() {
  //   if (Platform.OS === "android" && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage:
  //         "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }
  //
  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     this.setState({
  //       errorMessage: "Permission to access location was denied"
  //     });
  //   }
  //
  //   let location = await Location.getCurrentPositionAsync({});
  //   this.setState({ location });
  // };

  render() {
    // let text = "Waiting..";
    // let lat = 0;
    // let long = 0;
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   lat = parseFloat(this.state.location.coords.latitude, 5);
    //   long = parseFloat(this.state.location.coords.longitude, 5);
    // }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            // latitude: lat,
            latitude: 43.16053,
            // longitude: long,
            longitude: -77.54364,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    postion: 'absolute'
  }
  // map: {
  //   flex: 1,
  //   alignItems: "stretch",
  //   justifyContent: "center",
  //   flexDirection: "row"
  // }
});
