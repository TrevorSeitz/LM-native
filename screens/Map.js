import * as React from "react";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import { Platform, Text, View, StyleSheet, Thumbnail, AsyncStorage, Image } from "react-native";
import { Constants, Location, Permissions, MapView, Marker } from "expo";
import { Card } from "react-native-paper";
// import { MapView } from "react-native-maps";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this._retrieveData(),
      user: null,
      location: null,
      locations: [],
      checkLocation: {},
      errorMessage: null
    };
    this.unsubscribe = null;
  }

  ref = firebase.firestore().collection("locations");

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      console.log(value)
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  _getUserAsync = async () => {
    const { navigation } = this.props;
    const uid = await AsyncStorage.getItem("uid");
    let { status } = await Permissions.askAsync(Permissions.USER);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access user was denied"
      });
    }

    let user = await firebase
      .firestore()
      .collection("users")
      .doc(JSON.parse(navigation.getParam(uid)))
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            user: doc.data(),
            // key: doc.id,
            isLoading: false
          });
        } else {
          console.log("No such document!");
        }
      });;
    this.setState({ user });
  };

  _getUserName = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(JSON.parse(navigation.getParam(uid)))
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            user: doc.data(),
            // key: doc.id,
            isLoading: false
          });
        } else {
          console.log("No such document!");
        }
      });
  }

  _storeData = async user => {
    try {
      await AsyncStorage.setItem("locations", this.state.locations);
    } catch (error) {}
  };

  _storeLocation = async ()=> {
    try {
      await AsyncStorage.setItem("Locationkey", this.state.checkLocation);
      console.log("store location", this.state.checkLocation)
    } catch (error) {}
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    }
  }

  onCollectionUpdate = querySnapshot => {
    const uid = this.state.uid;
    let locations = [];
    this.ref
      .where("uid", "==", uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const uid = doc.data().uid;
          const name = doc.data().name;
          const venue = doc.data().venue;
          const latitude = doc.data().latitude;
          const longitude = doc.data().longitude;
          const contactName = doc.data().contactName;
          const contactPhone = doc.data().contactPhone;
          const email = doc.data().email;
          const description = doc.data().description;
          const image = doc.data().image;
          const imageFileName = doc.data().imageFileName;
          const imageFileLocation = doc.data().imageFileLocation;
          locations.push({
            id: id,
            uid: uid,
            name: name,
            venue: venue,
            latitude: latitude,
            longitude: longitude,
            contactName: contactName,
            contactPhone: contactPhone,
            email: email,
            description: description,
            image: image,
            imageFileName: imageFileName,
            imageFileLocation: imageFileLocation
          });
        });
      })
      .then(() => {
        this.setState({ locations: locations });
        // this.state.locations.map((item, i) => console.log(item));
      });
    // .then(() => this._storeData());
  };

  componentDidMount() {
    this._getLocationAsync().then(
      () => (this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate))
    );
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  goToLoc = (location) => {
    // this.setState({checkLocation: location.id})
    console.log(location.id)
    // this._storeLocation()
    this.props.navigation.navigate("Details", {
      Locationkey: `${JSON.stringify(location.id)}`
    })
  }


  render() {
    let lat = 0;
    let long = 0;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      lat = parseFloat(this.state.location.coords.latitude, 5);
      long = parseFloat(this.state.location.coords.longitude, 5);
    }
    const locations = this.state.locations;

    return (
      <View style={styles.container}>
        <Text>Hello {}</Text>
        <MapView
          style={styles.map}

          initialRegion={{
            // latitude: lat,
            latitude: 43.16053,
            // longitude: long,
            longitude: -77.54364,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: lat, longitude: long }}
            title={"Current Location"}
          >
            <View style={styles.radius}>
              <View style={styles.currentMarker} />
            </View>
          </MapView.Marker>

          {this.state.locations.map((location, i) => {
            const latitude = Number(location.latitude);
            const longitude = Number(location.longitude);
            return (
              <MapView.Marker
                key={i}
                title={location.name}
                description={location.description + "**Click to View**"}
                coordinate={{ latitude, longitude }}
                onCalloutPress={() => this.goToLoc(location)}
              >

                <View>
                <MapView.Callout>
                  <Image
                    source={{ uri: location.imageFileLocation }}
                    style={{ width: 40, height: 40 }}
                  />
                </MapView.Callout>
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
                </View>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center"
  },
  currentMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  map: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "row"
  }
});
