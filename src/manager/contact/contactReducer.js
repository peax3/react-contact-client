import { GET_CONTACTS, LOADING_CONTACTS_TRUE } from "../constants";

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
    case LOADING_CONTACTS_TRUE: {
      return {
        ...state,
        loadingContact: true,
      };
    }
    default:
      return state;
  }
};

export default contactReducer;
