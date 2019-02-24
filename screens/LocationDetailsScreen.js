import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Image
} from "react-native";
import { List, ListItem, Text, Card, Button } from "react-native-elements";
import * as firebase from "firebase";

export default class LocationDetailsScreen extends Component {
  static navigationOptions = {
    title: "Location Details"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      location: {},
      key: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    firebase
      .firestore()
      .collection("locations")
      .doc(JSON.parse(navigation.getParam("Locationkey")))
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            location: doc.data(),
            key: doc.id,
            isLoading: false
          });
        } else {
          console.log("No such document!");
        }
      });
  }

  deleteLocation(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase
      .firestore()
      .collection("locations")
      .doc(key)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.setState({
          isLoading: false
        });
        navigation.navigate("Location");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        this.setState({
          isLoading: false
        });
      });
    this.props.navigation.navigate("ListLocations");
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const imageURL = this.state.location.imageFileLocation;
    // console.log("url", imageURL);

    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.location.name}</Text>
            </View>
            <View>
              <Text h4>{this.state.location.venue}</Text>
            </View>
            <View>
              <Text h5>{this.state.location.contactName}</Text>
            </View>
            <View>
              <Text h5>Phone: {this.state.location.contactPhone}</Text>
            </View>
            <View>
              <Text h5>email: {this.state.location.email}</Text>
            </View>
          </View>
          <View>
            <Text>Description:</Text>
            <Text h4>{this.state.location.description}</Text>
          </View>
          <View style={styles.imageBox}>
            <View>
              <Image style={styles.image} source={{ uri: imageURL }} />
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#CCCCCC"}
              title="See Additional Photos"
              onPress={() => {
                this.props.navigation.navigate("AdditionalPhotos", {
                  Locationkey: `${JSON.stringify(this.state.key)}`
                });
              }}
            />
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#CCCCCC"}
              leftIcon={{ name: "edit" }}
              title="Edit"
              onPress={() => {
                this.props.navigation.navigate("EditLocation", {
                  Locationkey: `${JSON.stringify(this.state.key)}`
                });
              }}
            />
          </View>
          <View style={styles.detailButton}>
            <Button
              medium
              backgroundColor={"#999999"}
              color={"#FFFFFF"}
              leftIcon={{ name: "delete" }}
              title="Delete"
              onPress={() => this.deleteLocation(this.state.key)}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }

  // render() {
  //   return <Text>Hello</Text>;
  // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC"
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  detailButton: {
    marginTop: 10
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 7.5,
    padding: 5,
    width: 200,
    height: 200
  },
  imageBox: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
