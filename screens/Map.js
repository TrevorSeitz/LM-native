import * as React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions, MapView, Marker } from "expo";
import { Card } from "react-native-paper";
// import { MapView } from "react-native-maps";

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = "Waiting..";
    let lat = 0;
    let long = 0;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      lat = parseFloat(this.state.location.coords.latitude, 5);
      long = parseFloat(this.state.location.coords.longitude, 5);
    }
console.log(lat, long)
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
        >
          <MapView.Marker coordinate={{latitude: lat, longitude: long}} title={"test"}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor:  'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor:  'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  map: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "row"
  }
});
