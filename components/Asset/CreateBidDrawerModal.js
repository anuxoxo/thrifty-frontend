import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Animated,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import SubText from "../common/SubText";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const CreateBidDrawerModal = ({ isBottomSheetOpen, handleCloseBottomSheet }) => {
  const [bidAmount, setBidAmount] = React.useState("0");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isBottomSheetOpen}
      onRequestClose={handleCloseBottomSheet}
    >
      <View style={[styles.bottomSheet, { height: WINDOW_HEIGHT * 0.6 }]}>
        <View
          style={{
            flex: 0,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <SubText text={"Create Bid"} size={16} color={"#86827e"} />
          <TouchableOpacity onPress={handleCloseBottomSheet}>
            <Ionicons name="close" size={24} color="#86827e" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            {/* <SubText text={"Amount"} size={12} color={"#0E0E0E"} /> */}
            <View
              style={{
                height: 54,
                width: "100%",
                borderColor: "#0E0E0E",
                borderWidth: 2,
                borderRadius: 8.5,
                padding: 10,
              }}
            >
              <TextInput
                style={{
                  height: "100%",
                  width: "100%",
                }}
                onChange={(e) => setBidAmount(e.nativeEvent.text)}
                placeholder="Enter Amount"
                keyboardType="numeric"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <SubText text={"Bid Summary"} size={14} color={"#0E0E0E"} />
              {[
                { label: "Bid Amount", value: bidAmount },
                { label: "Comission", value: 0.02 * bidAmount },
                {
                  label: "Total Price",
                  value: 1.02 * bidAmount,
                  color: "#0E0E0E",
                },
              ].map((item, index) => (
                <>
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#86827e",
                      marginVertical: 4,
                    }}
                  />
                  <View
                    style={{
                      flex: 0,
                      width: "100%",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <SubText
                      text={item.label}
                      size={12}
                      color={item.color || "#86827e"}
                    />
                    <SubText
                      text={item.value}
                      size={12}
                      color={item.color || "#86827e"}
                    />
                  </View>
                </>
              ))}
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#0E0E0E",
                  marginVertical: 4,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
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
            }}
          >
            <Text style={[styles.button, { color: "#FFF" }]}>Create Bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateBidDrawerModal;


const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#0E0E0E",
  },
  button: {
    fontFamily: "Rubik",
    margin: 12,
    fontSize: 18,
    style: "bold",
  },
});
