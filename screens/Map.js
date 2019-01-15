import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView } from "expo";
import { Card } from "react-native-paper";

export default class Map extends React.Component {
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
        <Text>This is the Map and the map is this</Text>

        <MapView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
          }}
          initialRegion={{
            latitude: 43.156338,
            longitude: -77.614304,
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
