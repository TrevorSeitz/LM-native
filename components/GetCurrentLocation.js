import * as React from "react";
import { Platform, Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Constants, Location, Permissions } from 'expo';

export default class GetCurrentLocation extends React.Component {

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location: ", location)
    this._storeData(location)
  };

  _storeData = async (location) => {
    try {
      await AsyncStorage.setItem("location", location);
      console.log("in GetCurrentLocation")
    } catch (error) {}
  };

  render() {
    return(
      this._getLocationAsync()
    )
  }

}
