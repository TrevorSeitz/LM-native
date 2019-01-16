import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    );
  }
}

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
