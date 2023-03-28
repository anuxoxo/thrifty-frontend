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
import { useRoute } from "@react-navigation/core";
import PagerView from "react-native-pager-view";
import SubText from "../common";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const PAGE_VIEW_HEIGHT = Dimensions.get("window").height * 0.6;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const ProductScreen = ({ navigation }) => {
  const { name, price, images } = useRoute().params;

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = PAGE_VIEW_HEIGHT;
  const HEADER_SCROLL_DISTANCE = HEADER_HEIGHT - 50;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <DrawerModal
        isBottomSheetOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
      />
      <ScrollView>
        {/* {Platform.OS != "web" && (
          // <Animated.View
          //   style={{
          //     position: "absolute",
          //     top: 0,
          //     left: 0,
          //     right: 0,
          //     height: HEADER_HEIGHT,
          //     transform: [{ translateY: headerTranslateY }],
          //   }}
          // >
          <PagerView style={styles.viewPager} initialPage={0}>
            {images.map((imageSrc, index) => (
              <View style={styles.page} key={index}>
                <Image source={{ uri: imageSrc }} style={styles.img} />
              </View>
            ))}
          </PagerView>
          // </Animated.View>
        )} */}
        <PagerView style={styles.viewPager} initialPage={0}>
          {images.map((imageSrc, index) => (
            <View style={styles.page} key={index}>
              <Image source={{ uri: imageSrc }} style={styles.img} />
            </View>
          ))}
        </PagerView>
        {/* <ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        scrollEventThrottle={4}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //   { useNativeDriver: true }
        // )}
      > */}
        <View
          style={{
            padding: 10,
            backgroundColor: "#FFF",
            height: Dimensions.get("window").height,
          }}
        >
          <Text style={{ fontFamily: "Rubik", fontSize: 28 }}>{name}</Text>
          <Text
            style={{
              fontFamily: "Rubik",
              fontSize: 22,
              color: "#454343",
              marginTop: 15,
            }}
          >
            {`₹${price}`}
          </Text>
          <Text
            style={{
              fontFamily: "Rubik",
              fontSize: 12,
              color: "#454343",
              marginTop: 5,
            }}
          >
            {`3 Bidders`}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {["Electronics", "Laptop"].map((text, index) => (
              <View
                key={index}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 5,
                  backgroundColor: "#F2E0FF",
                  borderRadius: 20,
                  borderColor: "#1e1e1e",
                  borderWidth: 1,
                }}
              >
                <Text style={{ fontFamily: "Rubik", fontSize: 10 }}>
                  {text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: "#FFF",
              borderColor: "#1E1E1E",
              borderWidth: 0.5,
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.button, { color: "#1E1E1E" }]}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenBottomSheet}
          style={[styles.buttonContainer, { backgroundColor: "#724CF9" }]}
        >
          <Text style={[styles.button, { color: "#FFF" }]}>Bid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const DrawerModal = ({ isBottomSheetOpen, handleCloseBottomSheet }) => {
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

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
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
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    marginVertical: 10,
    fontFamily: "Rubik",
  },
  buttonContainer: {
    flex: 1,
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
    fontSize: 18,
    style: "bold",
  },
  viewPager: {
    height: PAGE_VIEW_HEIGHT,
    backgroundColor: "#1E1E1E",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

const dummyData = [
  {
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
];
