import React from "react";
import { Button, Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Home Screen</Text>
      <Button title="Go to Sell" onPress={() => navigation.navigate("Sell")} />
    </View>
  );
}

export default HomeScreen;
