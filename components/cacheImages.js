import React from "react";
import { AppLoading, Asset, Font } from "expo";
import { View, Text, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      require("./assets/images/circle.jpg")
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View>
        <Text>Hello world, this is my app.</Text>
      </View>
    );
  }
}
