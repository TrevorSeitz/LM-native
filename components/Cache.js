import React from "react";
import { Image } from "react-native";
import { FileSystem } from "expo";

function Cache(photolocations) {
  images.map(uri => {
    const path = `${FileSystem.cacheDirectory}${uri}`;
    const image = FileSystem.getInfoAsync(path);
    if (!image.exist) {
      this.saveToCache(uri);
    }
  });

  saveToCache = uri => {
    FileSystem.downloadAsync(uri, `${FileSystem.cacheDirectory}${uri}`);
  };
}

export default Cache;
