import {
  ADD_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  LOADING_CONTACTS_TRUE,
} from "../constants";
import { sortContacts } from "../../helpers/sortArray";

const INITIAL_STATE = {
  contacts: [],
  loadingContact: false,
  error: null,
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
      const sortedContacts = sortContacts([...state.contacts, contact]);
      console.log({ sortedContacts });
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
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default contactReducer;
