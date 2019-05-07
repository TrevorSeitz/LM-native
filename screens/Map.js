import * as React from "react";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  TouchableOpacity
} from "react-native";
import { Constants, Location, Permissions, MapView, Marker, Icon } from "expo";
import TabBarIcon from "../components/TabBarIcon";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this._retrieveData(),
      user: null,
      location: null,
      locations: [],
      checkLocation: {},
      latitude: 43.16053,
      longitude: -77.54364,
      errorMessage: null
    };
    this.unsubscribe = null;
  }

  ref = firebase.firestore().collection("locations");

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    }
  }

  componentDidMount() {
    this._getLocationAsync().then(
      () => (this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate))
    );
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("uid");
      if (value !== null) {
        this.setState({ uid: value });
      }
    } catch (error) {}
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("locations", this.state.locations);
    } catch (error) {}
  };

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
          const photosLocations = doc.data().photosLocations;
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
            photosLocations: photosLocations,
            image: image,
            imageFileName: imageFileName,
            imageFileLocation: imageFileLocation
          });
        });
      })
      .then(() => {
        this.setState({ locations });
      });
  };

  getCurrentPosition = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords });
  };

  goToLoc = location => {
    this.props.navigation.push("Details", {
      key: `${JSON.stringify(location.id)}`
    });
  };

  render() {
    let lat = this.state.latitude;
    let long = this.state.longitude;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      lat = parseFloat(this.state.location.latitude, 5);
      long = parseFloat(this.state.location.longitude, 5);
    }
    const locations = this.state.locations;

    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          style={styles.map}
          region={{
            // latitude: 43.16053,
            // longitude: -77.54364,
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
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
                  <View style={styles.radius}>
                    <View style={styles.marker} />
                  </View>
                </View>
              </MapView.Marker>
            );
          })}
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={this.getCurrentPosition}
          >
            <Icon.Ionicons name="md-locate" style={styles.button} />
          </TouchableOpacity>
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
  touchableArea: {
    opacity: 0.8,
    fontSize: 40,
    width: 80,
    height: 80,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0
  },
  button: {
    opacity: 0.8,
    fontSize: 40,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontSize: 15,
    color: "black",
    alignSelf: "center"
  }
});
