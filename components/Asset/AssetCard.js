import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";

import { SellContext } from "../../store/sellContext";

export const CARD_WIDTH = Dimensions.get("window").width * 0.4;
const CARD_HEIGHT = CARD_WIDTH * 1.1;

function AssetCard({
  name,
  price,
  images,
  category,
  sellerId,
  bookMarked = false,
  navigation,
  ...rest
}) {
  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={() => {
        navigation.navigate("ProductScreen", {
          name,
          price,
          images,
          category,
          sellerId,
          ...rest
        });
      }}
    >
      <View style={styles.bookmarkIcon}>
        {bookMarked ? (
          <Ionicons name="bookmark" size={16} color="#1E1E1E" />
        ) : (
          <Feather name="bookmark" size={16} color="#1E1E1E" />
        )}
      </View>
      <Image source={{ uri: images[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {name}
        </Text>
        <Text style={styles.cardPrice}>{`₹${price}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AssetCard;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#fff",
    borderColor: "#1E1E1E",
    borderWidth: 1,
    overflow: "hidden",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5,
    borderRadius: 15,
    shadowColor: "#1E1E1E",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: "#fff",
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 0.7,
    aspectRatio: 1.3,
  },
  cardContent: {
    paddingVertical: 1,
    paddingHorizontal: 2,
    alignItems: "center",
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 12,
    maxWidth: CARD_WIDTH * 0.7,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
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
});
