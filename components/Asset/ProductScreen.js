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
import SubText from "../common/SubText";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CreateBidDrawerModal from "./CreateBidDrawerModal"

const PAGE_VIEW_HEIGHT = Dimensions.get("window").height * 0.6;

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
      <CreateBidDrawerModal
        isBottomSheetOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        item={useRoute().params}
      />
      <ScrollView>
        <PagerView style={styles.viewPager} initialPage={0}>
          {images.map((imageSrc, index) => (
            <View style={styles.page} key={index}>
              <Image source={{ uri: imageSrc }} style={styles.img} />
            </View>
          ))}
        </PagerView>
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
