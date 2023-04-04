import React, { useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import FloatingIcon from "../helpers/FloatingIcon";

import { SellContext } from "../../store/sellContext";
import { dummyData } from "../home/AssetCardSwiperSection";
import SubText from "../common/SubText";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import CircularLoader from "../common/CircularLoader";

function SellScreen({ navigation }) {
  const { loading, productsListed, fetchSellListings } =
    useContext(SellContext);

  useEffect(() => {
    fetchSellListings();
  }, []);

  function addPressHandler() {
    navigation.navigate("AddProduct");
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          <FlatList
            data={productsListed}
            // data={dummyData}
            numColumns={1}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RenderCategory item={item} navigation={navigation} />
            )}
            style={{ marginHorizontal: 8, width: "100%" }}
          />
          <FloatingIcon pressHandler={addPressHandler} />
        </>
      )}
    </SafeAreaView>
  );
}

function RenderCategory({ item, navigation }) {
  const [showBids, setShowBids] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        marginVertical: 5,
        borderRadius: 15,
        shadowColor: "#1E1E1E",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
      }}
    // onPress={() =>
    //   navigation.navigate("ProductScreen", {
    //     ...item,
    //   })
    // }
    >
      <SellCard
        key={item._id}
        id={item._id}
        name={item.name}
        price={item.amount}
        images={item.images}
        category={item.category}
        sellerId={item.sellerId}
        navigation={navigation}
        deleteEnabled
        {...item}
      />

      <TouchableOpacity
        onPress={() => setShowBids(!showBids)}
        style={{
          width: "100%",
          paddingHorizontal: 5,
          padding: 7,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          borderRadius: 5,
        }}
      >
        <SubText text={"View Bids"} size={12} color="#373737" />
        <Entypo
          name="chevron-down"
          size={18}
          color="#373737"
          style={{ transform: [{ rotateZ: showBids ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>

      {showBids &&
        dummyBidsData.map((item) => (
          <View
            key={item.id}
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#efefef",
              padding: 5,
            }}
          >
            <SubText text={item.price} size={12} color={"#373737"} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.textButton}>
                <SubText text={"Accept"} size={12} color={"#0E0E0E"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.textButton}>
                <SubText text={"Reject"} size={12} color={"#FF6A6A"} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </View>
  );
}

export default function SellScreen({ navigation }) {
  const { loading, productsListed, fetchSellListings } = useContext(SellContext);

  useEffect(() => {
    fetchSellListings();
  }, []);

  function addPressHandler() {
    navigation.navigate("AddProduct");
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      {loading ? (
        <CircularLoader />
      ) : (
        <>
          <FlatList
            data={productsListed}
            numColumns={1}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RenderCategory item={item} navigation={navigation} />
            )}
            style={{ marginHorizontal: 8, width: "100%" }}
          />
          <FloatingIcon pressHandler={addPressHandler} />
        </>
      )}
    </SafeAreaView>
  );
}

const SellCard = ({
  id,
  name,
  price,
  images,
  category,
  sellerId,
  bookMarked = false,
  navigation,
  deleteEnabled = false,
  ...rest
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
          ...rest
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
          <MaterialIcons name="delete" size={16} color="black" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 7,
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
    borderRadius: 15,
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
  textButton: {
    margin: 4,
  },
});