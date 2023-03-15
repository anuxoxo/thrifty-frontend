import { StyleSheet, View, Text } from "react-native";
import AssetCardSwiper from "../Asset/AssetCardSwiper";

function AssetCardSwiperSection({ label = "Assets", navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            justifyContent: "space-between",
            flexDirection: "row",
            margin: 10,
          },
        ]}
      >
        <Text
          style={{
            color: "#1E1E1E",
            fontFamily: "Rubik",
            fontSize: 12,
          }}
        >
          {label.toUpperCase()}
        </Text>
        <Text
          style={{
            color: "#1E1E1E",
            fontFamily: "Rubik",
            fontSize: 10,
          }}
        >
          View all
        </Text>
      </View>

      <AssetCardSwiper data={dummyData} navigation={navigation} />
    </View>
  );
}

export default AssetCardSwiperSection;

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
});

export const dummyData = [
  {
    id: 1,
    name: "HP Victus AMD Ryzen Laptop",
    price: "50000",
    images: [
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/12/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 2,
    name: "Cracking the Coding Interview",
    price: "578",
    images: [
      "https://picsum.photos/id/13/200/300",
      "https://picsum.photos/id/14/200/300",
      "https://picsum.photos/id/15/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 3,
    name: "Cards",
    price: "50",
    images: [
      "https://picsum.photos/id/16/200/300",
      "https://picsum.photos/id/17/200/300",
      "https://picsum.photos/id/18/200/300",
    ],
    cancelled: true,
    status: "Cancelled",
  },
  {
    id: 4,
    name: "HP Victus AMD Ryzen Laptop",
    price: "50000",
    images: [
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/12/200/300",
    ],
    cancelled: true,
    status: "Failed",
  },
  {
    id: 5,
    name: "Cracking the Coding Interview",
    price: "578",
    images: [
      "https://picsum.photos/id/13/200/300",
      "https://picsum.photos/id/14/200/300",
      "https://picsum.photos/id/15/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 6,
    name: "Cards",
    price: "50",
    images: [
      "https://picsum.photos/id/16/200/300",
      "https://picsum.photos/id/17/200/300",
      "https://picsum.photos/id/18/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 7,
    name: "HP Victus AMD Ryzen Laptop",
    price: "50000",
    images: [
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/12/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 8,
    name: "Cracking the Coding Interview",
    price: "578",
    images: [
      "https://picsum.photos/id/13/200/300",
      "https://picsum.photos/id/14/200/300",
      "https://picsum.photos/id/15/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 9,
    name: "Cards",
    price: "50",
    images: [
      "https://picsum.photos/id/16/200/300",
      "https://picsum.photos/id/17/200/300",
      "https://picsum.photos/id/18/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
];
