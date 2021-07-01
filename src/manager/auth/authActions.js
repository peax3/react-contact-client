import axios, { setAuthTokenInHeaders } from "../../api/axios";
import {
  AUTHLOADING_TRUE,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  CLEAR_ERROR,
} from "../constants";

export const signInUser = (body) => async (dispatch) => {
  try {
    setLoadingToTrue();
    dispatch(setLoadingToTrue());

    const res = await axios.post("/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setAuthTokenInHeaders(res.data.token);
    dispatch(signInSuccess(res.data.token));
  } catch (error) {
    dispatch(signInFail(error.response.data.message));
  }
};

export const signUpUser = (body) => async (dispatch) => {
  try {
    setLoadingToTrue();
    const res = await axios.post("/auth/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(signUpSuccess(res.data.token));
  } catch (error) {
    const { response } = error;
    dispatch(signUpFail(response.data.message));
  }
};

export const clearError = () => async (dispatch) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000);
  dispatch({ type: CLEAR_ERROR });
};

const signInSuccess = (token) => {
  return {
    type: SIGNIN_SUCCESS,
    token,
  };
};

const signInFail = (error) => {
  return {
    type: SIGNIN_FAIL,
    error,
  };
};

// const loadUser = (userId) => {
//   return {
//     type: LOADUSER,
//     userId,
//   };
// };

const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token,
  };
};

const signUpFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    error,
  };
};

const setLoadingToTrue = () => {
  return {
    type: AUTHLOADING_TRUE,
  };
};
