import { StyleSheet, View, Text } from "react-native";
import AssetCardSwiper from "../Asset/AssetCardSwiper";

function AssetCardSwiperSection({ data = [], label = "Assets", navigation }) {
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

      <AssetCardSwiper data={data} navigation={navigation} />
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
      "https://images-ext-2.discordapp.net/external/q0yVuQ5D7lLPDXJPeZ_uNwunLuekNEhkAmPI4B5xFK0/https/in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/P/6P129PA-1_T1659669488.png?width=875&height=656",
      "https://picsum.photos/id/11/200/300",
      "https://picsum.photos/id/12/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 2,
    name: "Ergonomic Chair",
    price: "13000",
    images: [
      "https://images-ext-1.discordapp.net/external/037szyPKjasGJunrHssFvwIfxpIgh4tGMuf_O4FfiH0/%3Fq%3Dtbn%3AANd9GcTYyKwy8XOaYKZUaIMF4RJ0d5CwwueCHxyIcstJzFOq3z93rzRsBPdZh6fxwLalEHRyxSw%26usqp%3DCAU/https/encrypted-tbn0.gstatic.com/images?width=281&height=281",
      "https://picsum.photos/id/14/200/300",
      "https://picsum.photos/id/15/200/300",
    ],
    cancelled: false,
    status: "On Going",
  },
  {
    id: 3,
    name: "Apple Macbook Pro",
    price: "90000",
    images: [
      "https://images-ext-2.discordapp.net/external/ZQl2L10lxeF-SzYOOzwM_bQKDNJjvSabhpFM77Ww8oo/%3Fwid%3D904%26hei%3D840%26fmt%3Djpeg%26qlt%3D90%26.v%3D1664497359481/https/store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206?width=755&height=701",
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
      "https://images-ext-2.discordapp.net/external/q0yVuQ5D7lLPDXJPeZ_uNwunLuekNEhkAmPI4B5xFK0/https/in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/P/6P129PA-1_T1659669488.png?width=875&height=656",
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
