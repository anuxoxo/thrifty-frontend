import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import AssetCard, { CARD_WIDTH } from "./AssetCard";

const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 35;

function AssetCardSwiper({ data = {}, navigation }) {

  return (
    <ScrollView
      styles={styles.container}
      horizontal={true}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
      contentInset={{
        // iOS ONLY
        top: 0,
        left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
        bottom: 0,
        right: SPACING_FOR_CARD_INSET, // Right spacing for the very last card
      }}
      contentContainerStyle={{
        // contentInset alternative for Android
        paddingHorizontal:
          Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0, // Horizontal spacing before and after the ScrollView
      }}
    >
      {data.map((item, index) => (
        <AssetCard
          key={index}
          name={item.name}
          price={item.amount}
          images={item.images}
          category={item.category}
          sellerId={item.sellerId}
          navigation={navigation}
          {...item}
        />
      ))}
    </ScrollView>
  );
}

export default AssetCardSwiper;

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
});
