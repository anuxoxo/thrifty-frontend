import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { dummyData } from "../home/AssetCardSwiperSection";
import AssetCard from "../Asset/AssetCard";

const CategoryScreen = ({ navigation }) => {
  const { id, label } = useRoute().params;

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
      <FlatList
        data={dummyData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderCategory item={item} navigation={navigation} />
        )}
        style={{ marginHorizontal: 8 }}
      />
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
        price={item.price}
        images={item.images}
        navigation={navigation}
      />
    </TouchableOpacity>
  );
}

export default CategoryScreen;
