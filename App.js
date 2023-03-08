import { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./navigation/AuthStack";
import AuthenticatedStack from "./navigation/AuthenticatedStack";

import AuthContextProvider from "./store/authContext";

import { manageToken } from "./utils";
import { useFonts } from "expo-font";

function Outlet() {
  const [currentStack, setCurrentStack] = useState(<Text>Loading...</Text>);

  useLayoutEffect(() => {
    manageToken().then((token) => {
      if (token) setCurrentStack(<AuthenticatedStack />);
      else setCurrentStack(<AuthStack />);
    });
  }, []);

  return <>{currentStack}</>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik: require("./assets/fonts/Rubik-SemiBold.ttf"),
  });

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Outlet />
        </SafeAreaView>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
