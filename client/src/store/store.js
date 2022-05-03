import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import {
  FETCH_INITIAL,
  FETCH_MORE,
  FETCH_BY_SEARCH,
} from "../actions/actionTypes";

const actionSanitizer = (action) =>
  (action.type === FETCH_INITIAL || action.type === FETCH_MORE || action.type === FETCH_BY_SEARCH) &&
  action.payload
    ? { ...action, payload: "<<LONG_BLOB>>" }
    : action;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer,
    stateSanitizer: (state) =>
      state.posts.data ? { ...state, posts: { ...state.posts, data: "<<LONG_BLOB>>" } } : state,
  }) || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
