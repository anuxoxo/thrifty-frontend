import { createContext, useReducer, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_NAME } from "@env";

import axios from "../utils/axios";
import * as Types from "./actionTypes";
import { Authcontext } from "./authContext";

const initialState = {
  loading: false,
  orders: [],
  errors: [],
};
export const OrderContext = createContext(initialState);

function orderReducer(state, action) {
  switch (action.type) {
    case Types.ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Types.ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        errors: [],
      };
    case Types.ORDERS_FAILED:
      return {
        loading: false,
        orders: {},
        errors: action.payload,
      };
    case Types.ORDERS_RESET:
      return initialState;
    default:
      return state;
  }
}

export default function OrderContextProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { user } = useContext(Authcontext);

  async function fetchOrders() {
    dispatch({ type: Types.ORDERS_LOADING });
    const token = await AsyncStorage.getItem(TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = token;

    axios
      .post("/order/", { id: user?._id })
      .then((res) => {
        console.log(res.data)
        if (res.data?.success) {
          dispatch({
            type: Types.ORDERS_SUCCESS,
            payload: res.data.orders,
          });
        }
      })
      .catch((err) => {
        console.log(err?.response?.data)
        dispatch({ type: Types.ORDERS_FAILED, payload: err?.response?.data?.errors });
        // changeState({ visible: true, type: "error", text: err?.response?.data?.errors })
      });
  }

  const value = {
    ...state,
    fetchOrders
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
