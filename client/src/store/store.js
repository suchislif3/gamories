import { createStore, applyMiddleware } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import reducers from "../reducers";
import {
  FETCH_INITIAL,
  FETCH_MORE,
  FETCH_BY_SEARCH,
} from "../actions/actionTypes";

const actionSanitizer = (action) =>
  (action.type === FETCH_INITIAL ||
    action.type === FETCH_MORE ||
    action.type === FETCH_BY_SEARCH) &&
  action.payload
    ? { ...action, payload: "<<LONG_BLOB>>" }
    : action;

const composeEnhancers = composeWithDevToolsDevelopmentOnly({
  actionSanitizer,
  stateSanitizer: (state) => ({
    ...state,
    user: "<<user>>",
    posts: { ...state.posts, data: "<<posts>>", postById: "<<postById>>" },
  }),
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
