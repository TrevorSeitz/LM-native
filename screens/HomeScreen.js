import * as React from "react";
import {
  Text,
  Platform,
  Image,
  View,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Constants, MapView } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from "firebase";
import Map from "./Map";

import { Card } from "react-native-paper";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      user: this._retrieveData()
    };

  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        this.setState({ user: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    // console.log("user", this.state.user);
    return (
      <View style={styles.container}>
        <Map {...this.props}/>
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
