import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

export function manageToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_NAME);
      if (token) {
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Authorization"] = token;
        resolve(token);
      } else {
        reject("Token not found in AsyncStorage");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export async function fetchDataFromStorage(name) {
  const data = await AsyncStorage.getItem(name);
  return data;
}
