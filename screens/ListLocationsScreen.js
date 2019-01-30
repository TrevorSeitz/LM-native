import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { List, ListItem, Button, Icon } from "react-native-elements";
// import FontAwesome, { Icons } from "react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  MediaLibrary,
  FlatList
} from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class ListLocationsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Location List"
    };
  };

  constructor() {
    super();
    this.ref = firebase.firestore().collection("locations");
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      locations: []
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      "Material Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    });
  }

  onCollectionUpdate = querySnapshot => {
    let locations = [];
    querySnapshot.forEach(doc => {
      const id = doc.data().id;
      const name = doc.data().name;
      const description = doc.data().description;
      locations.push({ id: doc.id, name: name, description: description });
    });
    this.setState({ locations });
    // this.state.locations.map((item, i) => console.log(item));
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.activity}>
    //       <ActivityIndicator size="large" color="#0000ff" />
    //     </View>
    //   );
    // }
    return (
      <ScrollView style={styles.container}>
        <List>
          {this.state.locations.map((item, i) => (
            <ListItem
              key={item.id}
              title={item.name}
              onPress={() => {
                this.props.navigation.navigate("Details", {
                  Locationkey: `${JSON.stringify(item.id)}`
                });
              }}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
