import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FloatingIcon from "../helpers/FloatingIcon";
import { dummyData } from "../home/AssetCardSwiperSection";
import { AssetCard2 } from "../Asset/AssetCard";

function SellScreen({ navigation }) {
  function addPressHandler() {
    navigation.navigate("AddProduct");
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <FlatList
        data={dummyData.slice(0, 3)}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderCategory item={item} navigation={navigation} />
        )}
        style={{ marginHorizontal: 8, width: "100%" }}
      />
      <FloatingIcon pressHandler={addPressHandler} />
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 4,
  },
});
export default SellScreen;
