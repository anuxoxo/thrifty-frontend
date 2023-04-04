import React, { useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Modal
} from "react-native";

import { BidContext } from "../../store/bidContext";

import SubText from "../common/SubText";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import CircularLoader from "../common/CircularLoader";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const BidModal = ({ itemId, visible, setVisible, navigation }) => {
    const { loading, bids, fetchReceivedBids, acceptBid, rejectBid } =
      useContext(BidContext);
  
    useEffect(() => {
      fetchReceivedBids(itemId);
    }, [itemId]);
  
    const acceptBidHandler = async (data) => {
      setVisible(false)
      const res = await acceptBid(data);
      if (res) navigation.navigate("Success");
    };
  
    const rejectBidHandler = async (bid) => {
      setVisible(false)
      const res = await rejectBid(bid);
      if (res) navigation.navigate("Success");
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

export default BidModal;

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