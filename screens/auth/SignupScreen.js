import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={{ paddingTop: 20 }}>SignupScreen</Text>
        <Button
          title="Bypass this screen"
          onPress={() => this.props.navigation.navigate("Dashboard")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});
