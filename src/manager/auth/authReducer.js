import {
  SIGNUP_SUCCESS,
  AUTHLOADING_TRUE,
  SIGNIN_SUCCESS,
  LOADUSER,
  SIGNUP_FAIL,
  CLEAR_ERROR,
  SIGNIN_FAIL,
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
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        authLoading: false,
      };
    }
    case SIGNUP_SUCCESS: {
      localStorage.setItem("contactToken", action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        authLoading: false,
      };
    }
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
    case LOADUSER: {
      return {
        ...state,
        user: action.userId,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
