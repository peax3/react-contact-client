import axios from "../../api/axios";
import {
  ADD_CONTACT,
  CLEAR_CONTACT_TO_DELETE,
  CLEAR_EDIT_CONTACT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  GET_CONTACTS,
  LOADING_CONTACTS_TRUE,
  SET_CONTACT_TO_DELETE,
  SET_EDIT_CONTACT,
  UPDATE_CONTACT,
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

export const updateContact = (contact) => async (dispatch) => {
  const url = `/contacts/${contact._id}`;

  try {
    const res = await axios.put(url, contact, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(updateContactSuccess(res.data.contact));
  } catch (error) {
    const { response } = error;

    dispatch(contactError(response));
  }
};

export const deleteContact = (contactId) => async (dispatch) => {
  console.log({ contactId });
  try {
    await axios.delete(`/contacts/${contactId}`);
    dispatch({ type: DELETE_CONTACT, contactId });
  } catch (error) {
    const { response } = error;

    dispatch(contactError(response));
  }
};

export const setContactToDelete = (contact) => {
  return { type: SET_CONTACT_TO_DELETE, contact };
};

export const clearContactTodelete = () => {
  return { type: CLEAR_CONTACT_TO_DELETE };
};

export const setEditContact = (contact) => {
  return { type: SET_EDIT_CONTACT, contact };
};

export const clearEditContact = () => {
  return { type: CLEAR_EDIT_CONTACT };
};

const getContactSuccess = (contacts) => {
  return {
    type: GET_CONTACTS,
    contacts,
  };
};

const updateContactSuccess = (contact) => {
  return {
    type: UPDATE_CONTACT,
    contact,
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
