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
import SellContextProvider from "./store/sellContext";
import SearchContextProvider from "./store/searchContext";
import BidContextProvider from "./store/bidContext";
import OrderContextProvider from "./store/orderContext";

import { manageToken } from "./utils";

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
  return (
    <AuthContextProvider>
      <SellContextProvider>
        <SearchContextProvider>
          <BidContextProvider>
            <OrderContextProvider>
              <NavigationContainer>
                <SafeAreaView style={styles.container}>
                  <Outlet />
                </SafeAreaView>
              </NavigationContainer>
            </OrderContextProvider>
          </BidContextProvider>
        </SearchContextProvider>
      </SellContextProvider>
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
