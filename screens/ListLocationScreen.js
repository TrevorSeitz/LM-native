import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import { List, ListItem, Button, Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import {
  Font,
  AppLoading,
  Constants,
  ImagePicker,
  Permissions,
  MediaLibrary
} from "expo";

class ListLocationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Location List",
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: "transparent" }}
          // icon={{ name: "add-circle", style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => {
            navigation.push("AddLocation");
          }}
        />
      )
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
    const locations = [];
    querySnapshot.forEach(doc => {
      const { name, description } = doc.data();
      console.log(name);
      locations.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        description
      });
    });
    this.setState({
      locations,
      isLoading: false
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    // firebase
    //   .firestore()
    //   .collection("locations")
    //   .get()
    //   .then(snapshot => {
    //   Alert.alert(JSON.stringify(snapshot._docs));
    //   snapshot.forEach(doc => {
    //     Alert.alert(doc.id, "=>", doc.data());
    //   });
    // })
    // .catch(err => {
    //   Alert.alert("Error getting documents", err);
    // });

    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <List>
          {this.state.locations.map((item, i) => (
            <ListItem
              key={i}
              name={item.name}
              onPress={() => {
                this.props.navigation.navigate("LocationDetails", {
                  Locationkey: `${JSON.stringify(item.key)}`
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

export default ListLocationScreen;
