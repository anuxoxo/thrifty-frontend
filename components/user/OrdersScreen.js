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
import { Authcontext } from "../../store/authContext";
import CircularLoader from "../common/CircularLoader";

function OrdersScreen({ navigation }) {
  const { loading, orders, fetchOrders, updateOrder } = useContext(OrderContext)

  useEffect(() => {
    fetchOrders()
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
        ? <CircularLoader />
        : <FlatList
          data={orders}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RenderCategory
              item={item}
              navigation={navigation} />
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
  const { updateOrder } = useContext(OrderContext)
  const { user } = useContext(Authcontext);

  async function payHandler(success) {
    const data = success
      ? {
        paymentStatus: "Completed"
      }
      : {
        orderStatus: "Cancelled"
      };

    const res = await updateOrder(item._id, data);
    if (res)
      navigation.navigate("Success");
  }

  function completeDelivery() {
    console.log("completeDelivery")
  }
  function verifyDelivery() {
    console.log("verifyDelivery")
  }

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
      </View>
      {item.paymentStatus === "Pending" && item.orderStatus !== "Cancelled"
        ? <View style={styles.cardAction}>
          <TouchableOpacity
            style={{
              backgroundColor: "#724CF9",
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginHorizontal: 5,
              borderRadius: 8,
              width: "auto",
            }}
            onPress={payHandler.bind(this, true)}
          >
            <SubText text={"Pay Now"} size={12} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginHorizontal: 5,
              borderRadius: 8,
              width: "auto",
              borderWidth: 1,
            }}
            onPress={payHandler.bind(this, false)}
          >
            <SubText text={"Cancel"} size={12} color={"#0e0e0e"} />
          </TouchableOpacity>
        </View>
        : item.paymentStatus === "Completed" && item.orderStatus !== "Cancelled"
          ? <View style={styles.cardAction}>
            <TouchableOpacity
              style={{
                backgroundColor: "#724CF9",
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginHorizontal: 5,
                borderRadius: 8,
                width: "auto",
              }}
              onPress={user._id === item.sellerId ? completeDelivery : verifyDelivery}
            >
              <SubText
                text={
                  user._id === item.sellerId
                    ? "Complete Delivery"
                    : "Verify Delivery"}
                size={12}
                color={"#fff"} />
            </TouchableOpacity>
          </View>
          : null
      }
      <View
        style={[
          styles.status,
          {
            backgroundColor:
              item.orderStatus === "Cancelled"
                ? "#FF0E0E"
                : item.orderStatus === "Delivered"
                  ? "#54B435"
                  : "#FFD80E"
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            textTransform: "uppercase",
            fontSize: 10,
            color: item.orderStatus === "Processing" || item.orderStatus === "Pending" ? "#1E1E1E" : "#fff",
          }}
        >
          {item.orderStatus}
        </Text>
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
  cardContainer: {
    borderColor: "#1E1E1E",
    borderWidth: 1,
    overflow: "hidden",
    width: "auto",
    height: 200,
    borderRadius: 15,
    shadowColor: "#1E1E1E",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: "#fff",
    margin: 5,
  },
  cardStyle: {
    flex: 1,
    flexDirection: "row",
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
    width: "60%",
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
  cardAction: {
    flexDirection: "row-reverse",
    width: "auto",
    marginHorizontal: 8,
    marginVertical: 8,
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
    left: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
