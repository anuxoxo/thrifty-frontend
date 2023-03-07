import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomImagePicker() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  return (
    <View style={styles.outer}>
      <TouchableOpacity onPress={pickImage} style={[styles.addBtn, styles.img]}>
        <MaterialIcons name="add" size={35} color="grey" />
      </TouchableOpacity>

      {images.length > 0
        ? <FlatList
          horizontal
          data={images}
          renderItem={({ index, item }) =>
            <TouchableOpacity
              key={index}>
              <Image
                style={styles.img}
                source={{ uri: item }} />
            </TouchableOpacity>}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, idx) => idx}
        /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
    flexWrap: 'wrap'
  },
  addBtn: {
    borderColor: "lightgrey",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  img: {
    width: 80,
    height: 80,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5
  }
})