import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

function SellScreen({ navigation }) {
  const { id } = useRoute().params;

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Sell Screen {id}</Text>
    </View>
  );
}

export default SellScreen;
