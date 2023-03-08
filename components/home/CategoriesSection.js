import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";

import catogoriesImages from "../../assets/images/categories";

function CategoriesSection() {
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
        renderItem={renderCategory}
      />
    </View>
  );
}

function renderCategory({ item }) {
  return (
    <ImageBackground source={item.illus} style={styles.button}>
      <TouchableOpacity style={{ flex: 1, margin: 15 }}>
        <Text style={{ textAlign: "center" }}>{item.label}</Text>
      </TouchableOpacity>
    </ImageBackground>
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
    marginVertical: 4,
    marginHorizontal: 4,
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
    label: "More",
    illus: null,
  },
];
