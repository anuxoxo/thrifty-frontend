import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchSection from "./SearchSection";
import CategoriesSection from "./CategoriesSection";
import AssetCardSwiperSection from "./AssetCardSwiperSection";

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SearchSection />
      <CategoriesSection />
      <AssetCardSwiperSection label={"Featured"} />
      <AssetCardSwiperSection label={"New"} />
      <AssetCardSwiperSection label={"For You"} />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  checkbox: {
    marginRight: 16,
    alignSelf: "center",
  },
  title: {
    color: "grey",
    fontSize: 14,
    padding: 20,
    fontWeight: "bold",
  },
  btnContainer: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    backgroundColor: "#8065F8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
