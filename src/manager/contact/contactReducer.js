import {
  ADD_CONTACT,
  CLEAR_EDIT_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  LOADING_CONTACTS_TRUE,
  SET_EDIT_CONTACT,
  UPDATE_CONTACT,
} from "../constants";
import { sortContacts } from "../../helpers/sortArray";

const INITIAL_STATE = {
  contacts: [],
  loadingContact: false,
  error: null,
  inEditMode: false,
  contactToEdit: null,
};

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      return {
        ...state,
        contacts: action.contacts,
        loadingContact: false,
        error: null,
      };
    }
    case ADD_CONTACT: {
      const contact = action.contact;
      const sortedContacts = sortContacts([contact, ...state.contacts]);
      return {
        ...state,
        contacts: sortedContacts,
      };
    }
    case UPDATE_CONTACT: {
      const contactToUpdate = action.contact;
      const contacts = state.contacts.filter(
        (c) => c._id !== contactToUpdate._id
      );
      const sortedContacts = sortContacts([contactToUpdate, ...contacts]);

      return {
        ...state,
        contacts: sortedContacts,
      };
    }
    case LOADING_CONTACTS_TRUE: {
      return {
        ...state,
        loadingContact: true,
      };
    }
    case SET_EDIT_CONTACT: {
      return {
        ...state,
        inEditMode: true,
        contactToEdit: action.contact,
      };
    }
    case CLEAR_EDIT_CONTACT: {
      return {
        ...state,
        inEditMode: false,
        contactToEdit: null,
      };
    }
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default contactReducer;
