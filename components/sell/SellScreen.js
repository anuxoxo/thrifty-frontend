import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import FloatingIcon from "../helpers/FloatingIcon";

function SellScreen({ navigation }) {

  function addPressHandler() {
    navigation.navigate("AddProduct");
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Text>Sell Screen</Text>
      <FloatingIcon pressHandler={addPressHandler} />
    </SafeAreaView>
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