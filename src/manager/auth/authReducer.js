import { setAuthTokenInHeaders } from "../../api/axios";
import {
  SIGNUP_SUCCESS,
  AUTHLOADING_TRUE,
  SIGNIN_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_ERROR,
  SIGNIN_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
} from "../constants";

const INITIAL_STATE = {
  isAuthenticated: false,
  token: localStorage.getItem("contactToken"),
  user: null,
  error: null,
  authLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS: {
      localStorage.setItem("contactToken", action.token);
      setAuthTokenInHeaders(action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        authLoading: false,
      };
    }
    case SIGNUP_SUCCESS: {
      localStorage.setItem("contactToken", action.token);
      setAuthTokenInHeaders(action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        authLoading: false,
      };
    }
    case LOAD_USER_SUCCESS: {
      setAuthTokenInHeaders(state.token);
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
      };
    }
    case LOAD_USER_FAIL:
    case SIGNIN_FAIL:
    case SIGNUP_FAIL: {
      localStorage.removeItem("contactToken");
      return {
        ...state,
        error: action.error,
        token: null,
        isAuthenticated: false,
        authLoading: false,
        user: null,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case AUTHLOADING_TRUE: {
      return {
        ...state,
        authLoading: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
