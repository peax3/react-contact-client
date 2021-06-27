import { GET_CONTACTS } from "../constants";

const INITIAL_STATE = {
  contacts: null,
};
const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.payload) {
    case GET_CONTACTS: {
      break;
    }
    default:
      return state;
  }
};

export default contactReducer;
