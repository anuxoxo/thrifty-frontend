import { useLayoutEffect, useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";

import { Authcontext } from "../";
import logoText from "../assets/logoText.svg";
import { StyleSheet } from "react-native-web";
import { SvgXml } from "react-native-svg";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@auth", jsonValue);
  } catch (e) {
    // saving error
  }
};

export default function AuthStack() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "",
    iosClientId:
      "115982844469-4e8glphqom724b0o0se5l490nhacs0hf.apps.googleusercontent.com",
    androidClientId:
      "115982844469-aukn05vr30s4brk617qhlg4hdq95gkhi.apps.googleusercontent.com",
    webClientId:
      "115982844469-ooioul62d213238cvcdst9ic0omkkpbb.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      storeData(authentication);
      console.log(authentication);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        style={{ width: 192, height: 48 }}
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#724CF9",
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
