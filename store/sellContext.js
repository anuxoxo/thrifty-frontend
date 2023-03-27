import { createContext, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

import axios from "../utils/axios";
import * as Types from "./actionTypes";
import { Authcontext } from "./authContext";

const initialState = {
  loading: false,
  productsListed: [],
  errors: [],
};
export const SellContext = createContext(initialState);

function sellReducer(state, action) {
  switch (action.type) {
    case Types.SELL_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.SELL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productsListed: action.payload,
        errors: [],
      };
    case Types.SELL_LIST_FAILED:
      return {
        loading: false,
        productsListed: {},
        errors: action.payload.errors,
      };
    case Types.SELL_LIST_RESET:
      return initialState;
    default:
      return state;
  }
}

export default function SellContextProvider({ children }) {
  const [state, dispatch] = useReducer(sellReducer, initialState);
  const { user } = useContext(Authcontext);

  async function fetchSellListings() {
    dispatch({ type: Types.SELL_LIST_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get("/product/seller/" + user?._id + "/")
      .then((res) => {
        // console.log(res.data)
        if (res.data?.success) {
          dispatch({
            type: Types.SELL_LIST_SUCCESS,
            payload: res.data.products,
          });
        }
      })
      .catch((err) => {
        // console.log(err?.response?.data)
        dispatch({ type: Types.SELL_LIST_FAILED, payload: err?.response?.data?.errors });
        // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
      });
  }

  async function addProductToSell(data) {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .post("/product/add/", data)
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            fetchSellListings();
            resolve(true);
          }
        })
        .catch((err) => {
          // console.log(err?.response?.data)
          resolve(false);
        });
    });
  }

  async function deleteProductToSell(id) {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .delete("/product/" + id + "/")
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            fetchSellListings();
            resolve(true);
          }
        })
        .catch((err) => {
          // console.log(err?.response?.data)
          resolve(false);
        });
    });
  }



  const value = {
    ...state,
    fetchSellListings,
    addProductToSell,
    deleteProductToSell
  };

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
}
