import { useState, useContext, useEffect, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AssetCard from "../Asset/AssetCard";

import { SearchContext } from "../../store/searchContext";
import CircularLoader from "../common/CircularLoader";

const CategoryScreen = ({ navigation }) => {
  const { id, label } = useRoute().params;
  const { loading, results, searchByCategory } = useContext(SearchContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    searchByCategory(label);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    searchByCategory(label);
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View
        style={{
          width: "100%",
          display: "flex",
          padding: 15,
        }}
      >
        <Text style={{ fontFamily: "Rubik", fontSize: 20 }}>{label}</Text>
      </View>
      {loading ? (
        <CircularLoader />
      ) : (
        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <RenderCategory item={item} navigation={navigation} />
          )}
          style={{ marginHorizontal: 8 }}
        />
      )}
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
        {...item}
      />
    </TouchableOpacity>
  );
}

export default CategoryScreen;
