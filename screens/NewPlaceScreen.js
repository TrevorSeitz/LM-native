import * as React from "react";
import { Text, View, StyleSheet, Switch, Button } from "react-native";
import { Constants } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Card } from "react-native-paper";

class NewPlaceScreen extends React.Component {
  state = { switchValue: false };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchView}>
          <Text style={styles.paragraph}>Show Camera</Text>
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
        <Button
          title="Get Image From Roll"
          onPress={() => this.props.navigation.navigate("ImagePicker")}
        />
      </View>
    );
  }
}

export default NewPlaceScreen;

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
