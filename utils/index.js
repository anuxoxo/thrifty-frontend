import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

export function manageToken() {
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem(TOKEN_NAME);

    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = token;
    resolve(token);
  });
}

export async function fetchDataFromStorage(name) {
  const data = await AsyncStorage.getItem(name);
  return data;
}
