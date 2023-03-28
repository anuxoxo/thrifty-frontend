import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useEffect, useState } from "react";

import SearchSection from "./SearchSection";
import CategoriesSection from "./CategoriesSection";
import AssetCardSwiperSection from "./AssetCardSwiperSection";

import { SearchContext } from "../../store/searchContext";

function HomeScreen({ navigation }) {
  const [data, setData] = useState({
    "Electronics": [],
    "Furniture": [],
    "Others": []
  })
  const { searchByCategory } = useContext(SearchContext)

  async function getCategoryData(category) {
    const res = await searchByCategory(category)
    setData(prev => ({
      ...prev,
      [category]: res
    }))
  }

  useEffect(() => {
    getCategoryData("Electronics");
    getCategoryData("Furniture");
    getCategoryData("Others");
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SearchSection />
      <CategoriesSection navigation={navigation} />
      <AssetCardSwiperSection data={data["Electronics"]} navigation={navigation} label={"Electronics"} />
      <AssetCardSwiperSection data={data["Furniture"]} navigation={navigation} label={"Furniture"} />
      <AssetCardSwiperSection data={data["Others"]} navigation={navigation} label={"Others"} />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
