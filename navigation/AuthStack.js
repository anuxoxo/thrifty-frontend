import { useContext } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Authcontext } from "../store/authContext";

import illus1 from "../assets/images/login/illus1.png";
import SubText from "../components/common/SubText";

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
      <Image source={illus1} style={styles.img} />
      <Text
        style={{
          fontFamily: "Rubik",
          fontSize: 24,
          letterSpacing: 1,
          color: "#1E1E1E",
        }}
      >
        THRIFTY
      </Text>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            borderColor: "#1E1E1E",
            borderWidth: 0.5,
          },
        ]}
        onPress={request && handlePress}
      >
        <Text style={styles.button}>Login With Google</Text>
      </TouchableOpacity>
      <SubText
        text="By signing in, you agree to our terms of service and privacy policy"
        family="Poppins"
        size={8}
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
    justifyContent: "flex-end",
    paddingVertical: 20,
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
    height: "50%",
    aspectRatio: 1,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 20,
    backgroundColor: "#724CF9",
    borderRadius: 8,
    shadowColor: "#1E1E1E",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  button: {
    fontFamily: "Rubik",
    margin: 12,
    fontSize: 14,
    style: "bold",
    color: "#fff",
  },
});
