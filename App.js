import { useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Platform, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./navigation/AuthStack";
import AuthenticatedStack from "./navigation/AuthenticatedStack";

import AuthContextProvider from "./store/authContext";

import { manageToken } from "./utils";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "115982844469-ooioul62d213238cvcdst9ic0omkkpbb.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  //Web Client Secret: "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"
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: "", // specifies a hosted domain restriction
  androidClientId:
    "115982844469-aukn05vr30s4brk617qhlg4hdq95gkhi.apps.googleusercontent.com",
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId:
    "115982844469-4e8glphqom724b0o0se5l490nhacs0hf.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  // googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  // openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

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
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
