import { View, StyleSheet, TextInput, SafeAreaView, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import SearchIcon from "../../assets/icons/SearchIcon";
import { useNavigation } from '@react-navigation/native';

import { dummyData } from "../home/AssetCardSwiperSection";
import { AssetCard2 } from '../Asset/AssetCard';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");

  const onChangeHandler = (text) => {
    setSearchInput(text);
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <SearchIcon />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeHandler}
          keyboardType="default"
          value={searchInput}
          autoCorrect={false}
          editable={true}
          autoFocus={true}
          placeholder={"Search"}
        />
      </View>
      <FlatList
        data={dummyData.slice(0, 3)}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderCategory item={item} navigation={navigation} />
        )}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  )
}

function RenderCategory({ item, navigation }) {
  const dimensions = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{ flex: 1, width: "100%" }}
      onPress={() =>
        navigation.navigate("ProductScreen", {
          ...item,
        })
      }
    >
      <AssetCard2
        key={item.id}
        name={item.name}
        price={item.price}
        images={item.images}
        navigation={navigation}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#fff",
    flex: 1
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1E1E1E",
    borderRadius: 10,
    height: 50,
    paddingRight: 10,
    marginVertical: 20,
    marginHorizontal: 15
  },
  icon: {
    paddingHorizontal: 15,
    width: 50
  },
  input: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: 16,
  },
})