import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null
  };
  _ismounted = false;

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleLogin = () => {
    const { name, email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .then(user => console.log("user:", user))
      .then(user => this._storeData(user))
      .then(() => {
        if (this._ismounted) this.props.navigation.navigate("Map");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  _storeData = async user => {
    console.log(user.user.uid);
    try {
      await AsyncStorage.setItem("uid", user.user.uid);
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("Signup")}
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
