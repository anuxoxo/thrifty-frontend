import React, { useContext, useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SubText from "../common/SubText";
import { OrderContext } from "../../store/orderContext";

function OrdersScreen({ navigation }) {
  const { loading, orders, fetchOrders } = useContext(OrderContext);
  console.log(orders)

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <Text style={{ fontFamily: "Rubik", fontSize: 18 }}>My Orders</Text>
        <FontAwesome name="sort-amount-desc" size={18} color="#1E1E1E" />
      </View>

      {loading
        ? <Text>Loading...</Text>
        : <FlatList
          data={orders}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderCategory item={item} navigation={navigation} />
          )}
          style={{
            // marginHorizontal: 8,
            width: "100%",
          }}
        />}
    </View>
  );
}

export default OrdersScreen;

function RenderCategory({ item, navigation }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardStyle}>
        <Image source={{ uri: item.product.images[0] }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <Text numberOfLines={2} style={styles.cardTitle}>
            {item.product.name}
          </Text>
          <Text style={styles.cardPrice}>{`₹${item.product.amount}`}</Text>
        </View>

        <Image source={{ uri: item.product.images[0] }} style={styles.cardImage} />

        <View
          style={[
            styles.status,
            { backgroundColor: item.cancelled ? "#FF0E0E" : "#FFD80E" },
          ]}
        >
          <Text
            style={{
              fontFamily: "Poppins",
              textTransform: "uppercase",
              fontSize: 10,
              color: item.cancelled ? "#fff" : "#1E1E1E",
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  cardStyle: {
    borderColor: "#1E1E1E",
    borderWidth: 1,
    overflow: "hidden",
    width: "auto",
    height: 200,
    flexDirection: "column",
    justifyContent: "space-between",
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
    borderRadius: 15,
    margin: 5,
  },
  cardContent: {
    paddingHorizontal: 4,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Rubik",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: -5,
  },
  status: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
