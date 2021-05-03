import axios, { setAuthTOken } from "../../api/axios";
import { LOADING_TRUE, SIGNUP_SUCCESS, SIGNIN_SUCCESS } from "../constants";

export const signInUser = (body) => async (dispatch) => {
  try {
    setLoadingToTrue();
    dispatch(setLoadingToTrue());
    const res = await axios.post("/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(signInSuccess(res.data.token));
    setAuthTOken(res.data.token);
  } catch (error) {
    console.log({ error });
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
    console.log({ error });
  }
};

const signInSuccess = (token) => {
  return {
    type: SIGNIN_SUCCESS,
    token,
  };
};

const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token,
  };
};

const setLoadingToTrue = () => {
  return {
    type: LOADING_TRUE,
  };
};
