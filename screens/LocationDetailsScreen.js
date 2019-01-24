import React, { Component } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { List, ListItem, Text, Card, Button } from "react-native-elements";
import * as firebase from "firebase";

class LocationDetailsScreen extends Component {
  static navigationOptions = {
    title: "Location Details"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      location: {},
      key: ""
    };
  }
  //
  // componentDidMount() {
  //   const { navigation } = this.props;
  //   console.log(navigation);
  //   const ref = firebase
  //     .firestore()
  //     .collection("locations")
  //     .doc(JSON.parse(navigation.getParam("locationkey")));
  //   ref.get().then(doc => {
  //     if (doc.exists) {
  //       this.setState({
  //         location: doc.data(),
  //         key: doc.id,
  //         isLoading: false
  //       });
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  // }
  //
  // deleteLocation(key) {
  //   const { navigation } = this.props;
  //   this.setState({
  //     isLoading: true
  //   });
  //   firebase
  //     .firestore()
  //     .collection("locations")
  //     .doc(key)
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //       this.setState({
  //         isLoading: false
  //       });
  //       navigation.navigate("Location");
  //     })
  //     .catch(error => {
  //       console.error("Error removing document: ", error);
  //       this.setState({
  //         isLoading: false
  //       });
  //     });
  // }
  //
  // render() {
  //   if (this.state.isLoading) {
  //     return (
  //       <View style={styles.activity}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     );
  //   }
  //   return (
  //     <ScrollView>
  //       <Card style={styles.container}>
  //         <View style={styles.subContainer}>
  //           <View>
  //             <Text h3>{this.state.location.name}</Text>
  //           </View>
  //           <View>
  //             <Text h4>{this.state.location.venue}</Text>
  //           </View>
  //           <View>
  //             <Text h5>{this.state.location.latitude}</Text>
  //           </View>
  //           <View>
  //             <Text h5>{this.state.location.longitude}</Text>
  //           </View>
  //           <View>
  //             <Text h5>{this.state.location.contactName}</Text>
  //           </View>
  //           <View>
  //             <Text h5>{this.state.location.contactPhone}</Text>
  //           </View>
  //           <View>
  //             <Text h5>{this.state.location.email}</Text>
  //           </View>
  //           <View>
  //             <Text h4>{this.state.location.description}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.detailButton}>
  //           <Button
  //             large
  //             backgroundColor={"#CCCCCC"}
  //             leftIcon={{ name: "edit" }}
  //             title="Edit"
  //             onPress={() => {
  //               this.props.navigation.navigate("EditLocation", {
  //                 locationkey: `${JSON.stringify(this.state.key)}`
  //               });
  //             }}
  //           />
  //         </View>
  //         <View style={styles.detailButton}>
  //           <Button
  //             large
  //             backgroundColor={"#999999"}
  //             color={"#FFFFFF"}
  //             leftIcon={{ name: "delete" }}
  //             title="Delete"
  //             onPress={() => this.deleteLocation(this.state.key)}
  //           />
  //         </View>
  //       </Card>
  //     </ScrollView>
  //   );
  // }

  render() {
    return <Text>Hello</Text>;
  }
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
  }
});

export default LocationDetailsScreen;
