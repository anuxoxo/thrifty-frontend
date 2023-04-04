import { createContext, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

import axios from "../utils/axios";
import * as Types from "./actionTypes";
import { Authcontext } from "./authContext";

const initialState = {
  loading: false,
  bids: [],
  errors: [],
};
export const BidContext = createContext(initialState);

function bidReducer(state, action) {
  switch (action.type) {
    case Types.BIDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        bids: action.payload,
        errors: [],
      };
    case Types.BIDS_FAILED:
      return {
        loading: false,
        bids: {},
        errors: action.payload.errors,
      };
    case Types.BIDS_RESET:
      return initialState;
    default:
      return state;
  }
}

export default function BidContextProvider({ children }) {
  const [state, dispatch] = useReducer(bidReducer, initialState);
  const { user } = useContext(Authcontext);

  async function fetchReceivedBids() {
    dispatch({ type: Types.BIDS_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .get("/bid/seller/" + user?._id + "/")
      .then((res) => {
        // console.log(res.data)
        if (res.data?.success) {
          dispatch({
            type: Types.BIDS_SUCCESS,
            payload: res.data.data,
          });
        }
      })
      .catch((err) => {
        // console.log(err?.response?.data)
        dispatch({ type: Types.BIDS_FAILED, payload: err?.response?.data?.errors });
        // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
      });
  }

  async function createBid(data) {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .post("/bid/create/", { ...data, buyerId: user?._id })
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            fetchReceivedBids();
            resolve(true);
          }
        })
        .catch((err) => {
          // console.log(err?.response?.data)
          resolve(false);
        });
    });
  }

  async function acceptBid(data) {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .post("/product/accept/", data)
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            fetchReceivedBids();
            resolve(true);
          }
        })
        .catch((err) => {
          // console.log(err?.response?.data)
          resolve(false);
        });
    });
  }

  async function rejectBid(data) {
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    return new Promise(function (resolve, reject) {
      axios
        .post("/product/reject/", data)
        .then((res) => {
          // console.log(res.data)
          if (res.data?.success) {
            fetchReceivedBids();
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
    fetchReceivedBids,
    createBid,
    acceptBid,
    rejectBid
  };

  return <BidContext.Provider value={value}>{children}</BidContext.Provider>;
}
