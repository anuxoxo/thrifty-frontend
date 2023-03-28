import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";

import catogoriesImages from "../../assets/images/categories";

function CategoriesSection({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            justifyContent: "space-between",
            flexDirection: "row",
            margin: 8,
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
          CATEGORIES
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
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <RenderCategory item={item} navigation={navigation} />
        )}
        style={{ marginHorizontal: 8 }}
      />
    </View>
  );
}

function RenderCategory({ item, navigation }) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
      }}
      onPress={() =>
        navigation.navigate("CategoryScreen", {
          ...item,
        })
      }
    >
      <ImageBackground source={item.illus} style={styles.button}>
        <View style={{ flex: 1, margin: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Rubik",
              color: "#1E1E1E",
            }}
          >
            {item.label}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default CategoriesSection;

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Rubik",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    elevation: 3,
  },
});

const categories = [
  {
    id: 1,
    label: "Clothing",
    illus: catogoriesImages[0],
  },
  {
    id: 2,
    label: "Electronics",
    illus: catogoriesImages[1],
  },
  {
    id: 3,
    label: "Furniture",
    illus: catogoriesImages[2],
  },
  {
    id: 4,
    label: "Books & Media",
    illus: catogoriesImages[3],
  },
  {
    id: 5,
    label: "Sports & Outdoor",
    illus: catogoriesImages[4],
  },
  {
    id: 6,
    label: "Others",
    illus: null,
  },
];
