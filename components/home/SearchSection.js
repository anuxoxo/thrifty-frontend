import { StyleSheet, TextInput, Text, Pressable } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon";

import { useNavigation } from "@react-navigation/native";

function SearchSection() {
  const navigation = useNavigation();

  const openScreen = () => {
    navigation.navigate("SearchScreen")
  }

  return (
    <Pressable onPress={openScreen} style={styles.searchSection}>
      <Text style={styles.input}>Search</Text>
      <SearchIcon />
    </Pressable>
  );
}

export default SearchSection;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1E1E1E",
    borderRadius: 10,
    height: 50,
    paddingRight: 10,
    margin: 10,
  },
  input: {
    color: "#aaaa",
    fontSize: 15,
    fontFamily: "Rubik",
    paddingLeft: 15,
    outlineStyle: "none",
    flex: 1,
  },
});
