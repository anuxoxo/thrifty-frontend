import { StyleSheet, View, Text } from "react-native";
import AssetCardSwiper from "../Asset/AssetCardSwiper";

function AssetCardSwiperSection({ label = "Assets" }) {
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
            fontSize: "12px",
          }}
        >
          {label.toUpperCase()}
        </Text>
        <Text
          style={{
            color: "#1E1E1E",
            fontFamily: "Rubik",
            fontSize: "10px",
          }}
        >
          View all
        </Text>
      </View>

      <AssetCardSwiper data={dummyData} />
    </View>
  );
}

export default AssetCardSwiperSection;

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
});

const dummyData = [
  {
    name: "HP Victus AMD Ryzen Laptop",
    price: "50000",
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
  {
    name: "Cracking the Coding Interview",
    price: "578",
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
  {
    name: "Cards",
    price: "50",
    images: [
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
      "https://source.unsplash.com/random",
    ],
  },
];
