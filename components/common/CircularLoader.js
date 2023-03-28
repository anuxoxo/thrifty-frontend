import React from "react";
import { View, ActivityIndicator } from "react-native";

const CircularLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#724CF9" />
    </View>
  );
};

export default CircularLoader;
