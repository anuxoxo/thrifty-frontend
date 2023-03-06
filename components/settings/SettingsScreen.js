import React from "react";
import { Button, Text, View } from "react-native";

function SettingsScreen({ navigation }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text>Settings Screen</Text>
      <Button title="Go to Sell" onPress={() => navigation.navigate("Sell")} />
    </View>
  );
}

export default SettingsScreen;
