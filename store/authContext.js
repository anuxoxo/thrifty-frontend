import { createContext, useReducer, useEffect } from "react";
import { NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

import axios from "../utils/axios";
import * as Types from "./actionTypes";
import { fetchDataFromStorage } from "../utils";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  errors: [],
};
export const Authcontext = createContext(initialState);

function authReducer(state, action) {
  switch (action.type) {
    case Types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: Boolean(action.payload?.accessToken),
        user: action.payload,
        errors: [],
      };
    case Types.AUTH_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        errors: action.payload.errors,
      };
    case Types.AUTH_RESET:
      return initialState;
    default:
      return state;
  }
}

export default function AuthcontextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    dispatch({ type: Types.AUTH_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    fetchDataFromStorage("THRIFTY_USER_ID")
      .then((userId) => {
        if (userId) {
          axios
            .get("/user/" + userId + "/")
            .then((res) => {
              dispatch({ type: Types.AUTH_SUCCESS, payload: res.data.user });
            })
            .catch((error) => {
              dispatch({
                type: Types.AUTH_FAILED,
                payload: error.response.data,
              });
              logout();
            });
        } else {
          dispatch({ type: Types.AUTH_SUCCESS, payload: {} });
        }
      })
      .catch((err) => {
        logout();
      });
  }

  function googleAuth(success, accessToken) {
    dispatch({ type: Types.AUTH_LOADING });
    axios.defaults.headers.common["Authorization"] = accessToken;

    if (success)
      axios
        .get("/auth/google/")
        .then((response) => {
          dispatch({
            type: Types.AUTH_SUCCESS,
            payload: response.data?.user,
          });
          AsyncStorage.setItem(TOKEN_NAME, response.data.user.accessToken);
          AsyncStorage.setItem(
            "THRIFTY_USER_ID",
            response.data.user._id.toString()
          );
          setTimeout(() => {
            Platform.OS === "web"
              ? window.location.reload()
              : NativeModules.DevSettings.reload();
          }, 1000);
        })
        .catch((error) => {
          console.log(error)
          // return Object.keys(error.response?.data?.errors).map(key => {
          // })
        });
  }

  function logout() {
    dispatch({ type: Types.AUTH_LOADING });
    AsyncStorage.removeItem(TOKEN_NAME);
    AsyncStorage.removeItem("THRIFTY_USER_ID");
    dispatch({ type: Types.AUTH_RESET });
    setTimeout(() => {
      Platform.OS === "web"
        ? window.location.reload()
        : NativeModules.DevSettings.reload();
    }, 1000);
  }

  async function updateUserInfo(data) {
    dispatch({ type: Types.AUTH_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .patch("/user/update-deatils/", { ...data, email: state.user?.email })
        .then((res) => {
          if (res.data?.success) {
            AsyncStorage.setItem(
              "THRIFTY_USER_ID",
              res.data.user._id.toString()
            );
            dispatch({
              type: Types.AUTH_SUCCESS,
              payload: {
                user: res.data.user,
                accessToken: token,
              },
            });
            resolve(true);
          }
        })
        .catch((err) => {
          // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
          resolve(false);
        });
    });
  }

  const value = {
    ...state,
    googleAuth,
    updateUserInfo,
    logout,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
