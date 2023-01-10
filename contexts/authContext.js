import { createContext, useReducer, useEffect } from "react";
import axios from '../utils/axios';
import { TOKEN_NAME } from "@env"

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  errors: []
}
export const Authcontext = createContext(initialState);

function authReducer(state, action) {
  switch (action.type) {
    case Types.AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: Boolean(action.payload?.accessToken),
        user: action.payload,
        errors: [],
      }
    case Types.AUTH_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        errors: action.payload.errors
      }
    case Types.AUTH_RESET:
      return initialState
    default:
      return state
  }
}

export default function AuthcontextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    getUserInfo()
  }, [])

  async function getUserInfo() {
    dispatch({ type: Types.AUTH_LOADING })
    const token = await AsyncStorage.getItem(TOKEN_NAME)
    axios.defaults.headers.common['Authorization'] = token

    fetchDataFromStorage("THRIFTY_USER_ID")
      .then(userId => {
        if (userId) {
          axios.get("/user/me/" + userId)
            .then(res => {
              dispatch({ type: Types.AUTH_SUCCESS, payload: res.data.user })
            })
            .catch(error => {
              dispatch({ type: Types.AUTH_FAILED, payload: error.response.data })
              logout()
            })
        } else {
          dispatch({ type: Types.AUTH_SUCCESS, payload: {} })
        }
      })
      .catch(err => {
        logout()
      })
  }

  function googleAuth(success, accessToken) {
    dispatch({ type: Types.AUTH_LOADING })
    axios.defaults.headers.common['Authorization'] = accessToken

    if (success)
      axios.get("/auth/google/")
        .then(response => {
          dispatch({
            type: Types.AUTH_SUCCESS,
            payload: response.data?.user
          })
          AsyncStorage.setItem(TOKEN_NAME, response.data.user.accessToken);
          AsyncStorage.setItem("THRIFTY_USER_ID", response.data.user._id.toString());
        })
        .catch((error) => {
          // return Object.keys(error.response?.data?.errors).map(key => {

          // })
        })
    else { }
  }

  function logout() {
    dispatch({ type: Types.AUTH_LOADING });
    AsyncStorage.removeItem(TOKEN_NAME);
    AsyncStorage.removeItem("THRIFTY_USER_ID");
    dispatch({ type: Types.AUTH_RESET });
  }

  const value = {
    ...state,
    googleAuth,
    logout
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>
}

