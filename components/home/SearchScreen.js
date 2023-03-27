import { View, StyleSheet, TextInput, SafeAreaView, FlatList, TouchableOpacity, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import SearchIcon from "../../assets/icons/SearchIcon";

import { AssetCard2 } from '../Asset/AssetCard';

import { SearchContext } from "../../store/searchContext"

export default function SearchScreen() {
  const navigation = useNavigation();
  const { loading, results, searchByKeyword } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");

  const onChangeHandler = (text) => {
    setSearchInput(text);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchByKeyword(searchInput)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput])

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
      {loading
        ? <Text>Loading...</Text>
        : <FlatList
          data={results}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderCategory item={item} navigation={navigation} />
          )}
          style={{ width: "100%" }}
        />}
    </SafeAreaView>
  )
}

function RenderCategory({ item, navigation }) {
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
        key={item._id}
        name={item.name}
        price={item.amount}
        images={item.images}
        category={item.category}
        sellerId={item.sellerId}
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