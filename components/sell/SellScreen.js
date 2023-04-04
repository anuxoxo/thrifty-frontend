import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import FloatingIcon from "../helpers/FloatingIcon";

import { SellContext } from "../../store/sellContext";
import { BidContext } from "../../store/bidContext";

import SubText from "../common/SubText";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import CircularLoader from "../common/CircularLoader";
import { dummyData } from "../home/AssetCardSwiperSection";

const WINDOW_HEIGHT = Dimensions.get("window").height;

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
  const [showBids, setShowBids] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <BidModal
        visible={modalVisible}
        setVisible={setModalVisible}
        itemId={item._id}
      />
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
          elevation: 5,
        }}
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                borderColor: "#1E1E1E",
                borderWidth: 0.5,
              },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.button}>View Bids</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
        onPress={() => viewBidsHandler(item._id)}
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
      </TouchableOpacity> */}

        {/* {showBids &&
        (loading ? (
          <Text>Loading...</Text>
        ) : (
          bids?.map((item) => (
            <View
              key={item?._id}
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
              <SubText
                text={"Rs. " + item?.bidAmount}
                size={12}
                color={"#373737"}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    acceptBidHandler({
                      sellerId: item?.sellerId,
                      buyerId: item?.buyerId,
                      productId: item?.productId,
                      bidAmount: item?.bidAmount,
                    })
                  }
                  style={styles.textButton}
                >
                  <SubText text={"Accept"} size={12} color={"#0E0E0E"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    rejectBidHandler({
                      sellerId: item?.sellerId,
                      buyerId: item?.buyerId,
                      productId: item?.productId,
                      bidAmount: item?.bidAmount,
                    })
                  }
                  style={styles.textButton}
                >
                  <SubText text={"Reject"} size={12} color={"#FF6A6A"} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ))} */}
      </View>
    </>
  );
}

export const SellCard = ({
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
          ...rest,
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
            top: 40,
          }}
          onPress={async () => {
            await deleteProductToSell(id);
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="#373737"
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const BidModal = ({ visible, setVisible, navigation }) => {
  const { loading, bids, fetchReceivedBids, acceptBid, rejectBid } =
    useContext(BidContext);

  const [showBids, setShowBids] = useState(false);

  const [item, setItem] = useState({});
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetchReceivedBids();
  }, []);

  const viewBidsHandler = (id) => {
    setShowBids(!showBids);
    fetchReceivedBids(id);
  };

  const acceptBidHandler = async (bid) => {
    const res = await acceptBid(data);
    if (res) navigation.navigate("Success");
  };

  const rejectBidHandler = async (bid) => {
    await rejectBid(bid);
    fetchReceivedBids();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Received Bids</Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="#373737" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {loading ? (
              <CircularLoader />
            ) : (
              bids?.map((item) => (
                <View
                  key={item?._id}
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
                  <SubText
                    text={"Rs. " + item?.bidAmount}
                    size={12}
                    color={"#373737"}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() =>
                        acceptBidHandler({
                          sellerId: item?.sellerId,
                          buyerId: item?.buyerId,
                          productId: item?.productId,
                          bidAmount: item?.bidAmount,
                        })
                      }
                      style={styles.textButton}
                    >
                      <SubText text={"Accept"} size={12} color={"#0E0E0E"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        rejectBidHandler({
                          sellerId: item?.sellerId,
                          buyerId: item?.buyerId,
                          productId: item?.productId,
                          bidAmount: item?.bidAmount,
                        })
                      }
                      style={styles.textButton}
                    >
                      <SubText text={"Reject"} size={12} color={"#FF6A6A"} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </Modal>
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
    // borderWidth: 1,
    overflow: "hidden",
    width: "auto",
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  cardImage: {
    width: 100,
    height: "auto",
    aspectRatio: 1,
    borderRadius: 15,
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
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
    fontFamily: "Rubik",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: "#724CF9",
    borderRadius: 8,
    shadowColor: "#1E1E1E",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  button: {
    fontFamily: "Rubik",
    margin: 12,
    fontSize: 14,
    style: "bold",
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: WINDOW_HEIGHT * 0.6,
  },
  modalView: {
    width: "100%",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    padding: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  modalBody: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    minHeight: WINDOW_HEIGHT * 0.3,
  },
});

export default SellScreen;

const dummyBidsData = [
  {
    id: 1,
    bidAmount: "20000",
  },
  {
    id: 2,
    bidAmount: "22000",
  },
  {
    id: 3,
    bidAmount: "19000",
  },
  {
    id: 4,
    bidAmount: "15000",
  },
  {
    id: 5,
    bidAmount: "13000",
  },
  {
    id: 6,
    bidAmount: "25000",
  },
  {
    id: 7,
    bidAmount: "23000",
  },
];
