import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FloatingIcon from "../helpers/FloatingIcon";

function SellScreen({ navigation }) {

  function addPressHandler() {
    navigation.navigate("AddProduct");
  }

  return (
    <View style={styles.outerContainer}>
      <Text>Sell Screen</Text>
      <FloatingIcon pressHandler={addPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
})
export default SellScreen;