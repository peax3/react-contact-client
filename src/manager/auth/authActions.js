import axios from "../../api/axios";
import {
  AUTHLOADING_TRUE,
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_FAIL,
  CLEAR_ERROR,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants";

export const signInUser = (body) => async (dispatch) => {
  try {
    dispatch(setLoadingToTrue());

    const res = await axios.post("/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(signInSuccess(res.data.token));
  } catch (error) {
    const { response } = error;
    dispatch(signInFail(response.data.message));
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
  await delay(5000);
  dispatch({ type: CLEAR_ERROR });
};

const signInSuccess = (token) => {
  return {
    type: SIGNIN_SUCCESS,
    token,
  };
};

export const getLoggenInUser = (token) => async (dispatch) => {
  try {
    setLoadingToTrue();
    await axios.get("/auth/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: LOAD_USER_SUCCESS });
  } catch (error) {
    const { response } = error;
    dispatch(getLoggedUserfailed(response.data.message));
  }
};

const signInFail = (error) => {
  return {
    type: SIGNIN_FAIL,
    error,
  };
};

const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token,
  };
};

const getLoggedUserfailed = (error) => {
  return {
    type: LOAD_USER_FAIL,
    error,
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
