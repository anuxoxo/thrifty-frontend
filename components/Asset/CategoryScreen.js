import { useContext, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AssetCard from "../Asset/AssetCard";

import { SearchContext } from "../../store/searchContext";

const CategoryScreen = ({ navigation }) => {
  const { id, label } = useRoute().params;
  const { loading, results, searchByCategory } = useContext(SearchContext)

  useEffect(() => {
    console.log(label)
    searchByCategory(label);
  }, [])

  return (
    <View>
      <View
        style={{
          width: "100%",
          display: "flex",
          padding: 15,
        }}
      >
        <Text style={{ fontFamily: "Rubik", fontSize: 20 }}>{label}</Text>
      </View>
      {loading
        ? <Text>Loading...</Text>
        : <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderCategory item={item} navigation={navigation} />
          )}
          style={{ marginHorizontal: 8 }}
        />}
    </View>
  );
};

function RenderCategory({ item, navigation }) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() =>
        navigation.navigate("ProductScreen", {
          ...item,
        })
      }
    >
      <AssetCard
        key={item.id}
        name={item.name}
        price={item.amount}
        category={item.category}
        sellerId={item.sellerId}
        images={item.images}
        navigation={navigation}
      />
    </TouchableOpacity>
  );
}

export default CategoryScreen;
