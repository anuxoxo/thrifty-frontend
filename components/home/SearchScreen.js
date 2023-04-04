import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import SearchIcon from "../../assets/icons/SearchIcon";
import { SearchContext } from "../../store/searchContext";
import { SellContext } from "../../store/sellContext";

export default function SearchScreen() {
  const navigation = useNavigation();
  const { loading, results, searchByKeyword } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");

  const onChangeHandler = (text) => {
    setSearchInput(text);
  };

  useEffect(() => {
    if (searchInput) {
      const delayDebounceFn = setTimeout(() => {
        searchByKeyword(searchInput);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchInput]);

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
      {loading ? (
        <ActivityIndicator size="large" color="#724CF9" />
      ) : (
        <FlatList
          data={results}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderCategory item={item} navigation={navigation} />
          )}
          style={{ width: "100%" }}
        />
      )}
    </SafeAreaView>
  );
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
      <SearchResultCard
        key={item._id}
        name={item.name}
        price={item.amount}
        images={item.images}
        category={item.category}
        sellerId={item.sellerId}
        navigation={navigation}
        {...item}
      />
    </TouchableOpacity>
  );
}

const SearchResultCard = ({
  id,
  name,
  price,
  images,
  category,
  sellerId,
  bookMarked = false,
  navigation,
  deleteEnabled = false,
}) => {
  const { deleteProductToSell } = useContext(SellContext);

  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => {
        navigation.navigate("ProductScreen", {
          id,
          name,
          price,
          images,
          category,
          sellerId,
        });
      }}
    >
      <Image source={{ uri: images[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {name}
        </Text>
        <Text style={styles.cardPrice}>{`₹${price}`}</Text>
      </View>
      {deleteEnabled ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 33,
          }}
          onPress={async () => {
            await deleteProductToSell(id);
          }}
        >
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#fff",
    flex: 1,
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
    marginHorizontal: 15,
  },
  icon: {
    paddingHorizontal: 15,
    width: 50,
  },
  input: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: 16,
  },
  cardStyle: {
    backgroundColor: "#fff",
    borderColor: "#1E1E1E",
    borderWidth: 1,
    overflow: "hidden",
    width: "auto",
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5,
    borderRadius: 15,
    shadowColor: "#1E1E1E",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: "#fff",
  },
  cardImage: {
    width: 100,
    height: "auto",
    aspectRatio: 1,
  },
  cardContent: {
    paddingHorizontal: 4,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
  },
  bookmarkIcon: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 24,
    height: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
