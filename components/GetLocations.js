import React from "react";
import { Text, FlatList } from "react-native";
import firebase from "expo-firebase-app";

// API can be accessed with: firebase.firestore();

export default class WheatView extends React.Component {
  ref = firebase.firestore().collection("locations");
  state = { locations: [], loading: false };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = querySnapshot => {
    const locations = [];
    querySnapshot.forEach(doc => {
      const { title, complete } = doc.data();
      locations.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete
      });
    });

    this.setState({
      locations,
      loading: false
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderItem = ({ item }) => (
    <Text onPress={() => this.toggle(item)}>{item.title}</Text>
  );

  toggle = ({ doc, complete }) => {
    doc.ref.update({ complete: !complete });
  };

  post = ({ title }) => {
    this.ref.add({
      title,
      complete: false
    });
  };

  render() {
    return (
      <FlatList data={this.state.locations} renderItem={this.renderItem} />
    );
  }
}
