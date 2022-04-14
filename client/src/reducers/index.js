import { combineReducers } from "redux";
import postsReducer from "./postsReducer";

const reducers = combineReducers({
  postsReducer,
});

export default reducers;
