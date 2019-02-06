import * as React from "react";
import { Text, Platform, Image, View, StyleSheet } from "react-native";
import { Constants, MapView } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Map from "./Map";

import { Card } from "react-native-paper";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    // console.log("props", props);
  }

  // <Text>Hi {user && user.email}!</Text>

  render() {
    return (
      <View style={styles.container}>
        <Map />
        <Card />
      </View>
    );
  }
}

export default HomeScreen;

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
