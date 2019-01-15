import * as React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { Constants, MapView } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Card } from "react-native-paper";

export default class NewPlaceScreen extends React.Component {
  state = { switchValue: false };

  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
