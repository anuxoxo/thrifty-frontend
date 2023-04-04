import { useContext } from "react";
import { View, Button, StyleSheet, Image } from "react-native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Authcontext } from "../store/authContext";

// import illus1 from "../assets/images/login/illus1.png";

WebBrowser.maybeCompleteAuthSession();

export default function AuthStack() {
  const { googleAuth, devAuth } = useContext(Authcontext);

  const [request, response, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "115982844469-7er3tdt57hdhokpucif9qut022sm6arj.apps.googleusercontent.com",
    iosClientId:
      "115982844469-4e8glphqom724b0o0se5l490nhacs0hf.apps.googleusercontent.com",
    androidClientId:
      "115982844469-aukn05vr30s4brk617qhlg4hdq95gkhi.apps.googleusercontent.com",
    webClientId:
      "115982844469-ooioul62d213238cvcdst9ic0omkkpbb.apps.googleusercontent.com",
  });

  async function handlePress() {
    const response = await googlePromptAsync();
    if (response?.type === "success") {
      const { authentication } = response;
      await googleAuth(true, authentication?.accessToken);
    } else {
      await googleAuth(false, null);
    }
    // devAuth();
  }

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: illus1 }} style={styles.img} /> */}
      <Button
        style={{ width: 192, height: 48 }}
        disabled={!request}
        title="Login"
        onPress={handlePress}
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
  img: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
