import axios from "../../api/axios";
import {
  ADD_CONTACT,
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

export const addContact = (contact) => async (dispatch) => {
  try {
    const res = await axios.post("/contacts", contact, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(AddContactSuccess(res.data.contact));
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

const AddContactSuccess = (contact) => {
  return {
    type: ADD_CONTACT,
    contact,
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
