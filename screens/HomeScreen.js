import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import NewPlaceScreen from "./NewPlaceScreen";
// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>This is the Home Screem</Text>

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Card />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
  // New: { screen: NewPlaceScreen }
});

export default createAppContainer(AppNavigator);

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
