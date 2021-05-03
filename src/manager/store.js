import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/authReducer";
import contactReducer from "./contact/contactReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  contactState: contactReducer,
});

const middleware = [thunk];

const INITIAL_STATE = {};

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
