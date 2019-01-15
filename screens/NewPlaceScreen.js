import * as React from "react";
import { Button, Text, View, StyleSheet, Switch } from "react-native";
import { Constants, MapView } from "expo";

import { Card } from "react-native-paper";

export default class NewPlaceScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>hello World - new place screen</Text>
        <View style={{ flex: 1 }}>
          <View style={styles.switchView}>
            <Text>Show Camera</Text>
            <Switch
              onValueChange={value => {
                this.setState({ switchValue: value });
              }}
              value={this.state.switchValue}
              style={styles.switch}
            />
          </View>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              <Text>Camera on</Text>
            </View>
          ) : (
            <View style={styles.cameraview}>
              <Text>Camera off</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
