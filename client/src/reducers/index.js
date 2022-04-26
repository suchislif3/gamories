import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";
import feedbackReducer from "./feedbackReducer";

const reducers = combineReducers({
  user: authReducer,
  feedback: feedbackReducer,
  posts: postsReducer,
});

export default reducers;
