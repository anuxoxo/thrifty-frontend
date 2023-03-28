import { createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

import axios from "../utils/axios";
import * as Types from "./actionTypes";

const initialState = {
  loading: false,
  results: [],
  errors: [],
};
export const SearchContext = createContext(initialState);

function searchReducer(state, action) {
  switch (action.type) {
    case Types.SEARCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        errors: [],
      };
    case Types.SEARCH_FAILED:
      return {
        loading: false,
        results: {},
        errors: action.payload.errors,
      };
    case Types.SEARCH_RESET:
      return initialState;
    default:
      return state;
  }
}

export default function SearchContextProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  async function searchByKeyword(searchText) {
    dispatch({ type: Types.SEARCH_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .post("/product/search/", { searchText })
      .then((res) => {
        // console.log(res.data)
        if (res.data?.success) {
          dispatch({
            type: Types.SEARCH_SUCCESS,
            payload: res.data.products,
          });
        }
      })
      .catch((err) => {
        // console.log(err?.response?.data)
        dispatch({ type: Types.SEARCH_FAILED, payload: err?.response?.data?.errors });
        // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
      });
  }

  async function searchByCategory(category) {
    dispatch({ type: Types.SEARCH_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .get("product/category/" + category + "/")
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            resolve(res.data.products)
            dispatch({
              type: Types.SEARCH_SUCCESS,
              payload: res.data.products,
            });
          }
        })
        .catch((err) => {
          // console.log(err?.response?.data)
          dispatch({ type: Types.SEARCH_FAILED, payload: err?.response?.data?.errors });
          // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
          resolve([])
        });
    })
  }

  const value = {
    ...state,
    searchByKeyword,
    searchByCategory
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
