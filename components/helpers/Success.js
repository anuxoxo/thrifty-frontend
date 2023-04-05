import React, { useEffect, useRef, useState } from "react";
import { Image, View, Text, Animated, Easing } from "react-native";
// import bidSuccess from "../../assets/images/common/bidSuccess.png";
import { useNavigation } from "@react-navigation/native";
import successLottie from "../../assets/lottie/successful.gif";

export default function Success() {
  const navigation = useNavigation();

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.goBack();
    }, 1500);

    return () => {
      clearTimeout(time);
    };
  }, []);

  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image style={{ width: 300, height: 200 }} source={successLottie} />

      {/* <Image
        source={bidSuccess}
        style={{
          width: "40%",
          height: "40%",
          aspectRatio: 1.2,
        }}
      /> */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Success!
      </Text>
    </View>
  );
}
