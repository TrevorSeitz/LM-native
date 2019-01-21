import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import { List, ListItem, Button, Icon } from "react-native-elements";
// import firebase from "../Firebase";

class LocationListScreen extends Component {
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

  onCollectionUpdate = querySnapshot => {
    const locations = [];
    querySnapshot.forEach(doc => {
      const {
        photoFileName,
        name,
        venue,
        latitude,
        longitude,
        contactName,
        contactPhone,
        email,
        description
      } = doc.data();
      locations.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fileName,
        name,
        venue,
        latitude,
        longitude,
        contactName,
        contactPhone,
        email,
        description
      });
    });
    this.setState({
      location,
      isLoading: false
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
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
              // title={item.title}
              // leftIcon={{ name: "book", type: "font-awesome" }}
              name={item.name}
              venue={item.venue}
              latitude={item.latitude}
              longitude={item.longitude}
              contactName={item.contactName}
              contactPhone={item.contactPhone}
              email={item.email}
              description={item.description}
              // leftIcon={{ name: "book", type: "font-awesome" }}
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

export default LocationListScreen;
