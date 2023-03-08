import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon";

function SearchSection({ navigation }) {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        keyboardType="default"
      />
      <SearchIcon />
    </View>
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
    marginVertical: 10,
  },
  input: {
    height: 40,
    margin: 10,
    color: "#1E1E1E",
    fontSize: 15,
    fontFamily: "Rubik",
    paddingLeft: 10,
    outlineStyle: "none",
    width: "100%",
  },
});
