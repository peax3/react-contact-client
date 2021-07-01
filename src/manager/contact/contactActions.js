import axios from "../../api/axios";
import {
  CONTACT_ERROR,
  GET_CONTACTS,
  LOADING_CONTACTS_TRUE,
} from "../constants";

export const getContacts = () => async (dispatch) => {
  try {
    dispatch(setLoadingContactsToTrue());
    const res = await axios.get("/contacts");
    const contacts = res.data;
    dispatch(getContactSuccess(contacts));
  } catch (error) {
    const { response } = error;
    dispatch(contactError(response));
  }
};

const getContactSuccess = (contacts) => {
  return {
    type: GET_CONTACTS,
    contacts,
  };
};

const contactError = (error) => {
  return {
    type: CONTACT_ERROR,
    error,
  };
};

const setLoadingContactsToTrue = () => {
  return {
    type: LOADING_CONTACTS_TRUE,
  };
};
