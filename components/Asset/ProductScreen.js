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
} from "react-native";
import { useRoute } from "@react-navigation/core";
import PagerView from "react-native-pager-view";

const PAGE_VIEW_HEIGHT = Dimensions.get("window").height * 0.7;

const ProductScreen = ({ navigation }) => {
  const { name, price, images } = useRoute().params;

  return (
    <SafeAreaView style={styles.outerContainer}>
      <PagerView style={styles.viewPager} initialPage={0}>
        {images.map((imageSrc, index) => (
          <View style={styles.page} key={index}>
            <Image source={{ uri: imageSrc }} style={styles.img} />
          </View>
        ))}
      </PagerView>

      <View style={{ padding: 10 }}>
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
              <Text style={{ fontFamily: "Rubik", fontSize: 10 }}>{text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: "#FFF" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.button, { color: "#1E1E1E" }]}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
