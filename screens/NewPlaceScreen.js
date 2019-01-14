import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView } from "expo";

import { Card } from "react-native-paper";

export default class NewPlaceScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>hello World - new place screen</Text>
      </View>
    );
  }
}
