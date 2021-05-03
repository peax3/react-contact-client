import { SIGNUP_SUCCESS, LOADING_TRUE, SIGNIN_SUCCESS } from "../constants";

const INITIAL_STATE = {
  isAuthenticated: false,
  token: localStorage.getItem("contactToken") || null,
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS: {
      localStorage.setItem("contactToken", action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        loading: false,
      };
    }
    case LOADING_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
