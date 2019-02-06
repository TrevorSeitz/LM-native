import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import * as firebase from "firebase";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errorMessage: null
    };
  }

  handleSignup = () => {
    const { name, email, pasword, passwordConfirm } = this.state;
    if (password != passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        return this.ref.doc(resp.user.uid).set({
          name: name
        });
      })
      .then(result => this.props.navigation.navigate("Home"))
      .catch(
        () => {},
        error => {
          Alert.alert(error);
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ paddingTop: 20 }}>SignupScreen</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          value={this.state.passwordConfirm}
        />
        <Button title="Sign Up" onPress={this.handleSignup} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Bypass this screen"
          onPress={() => this.props.navigation.navigate("Dashboard")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
