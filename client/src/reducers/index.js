import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";
import currentPostReducer from "./currentPostReducer";
import feedbackReducer from "./feedbackReducer";

const reducers = combineReducers({
  user: authReducer,
  currentPost: currentPostReducer,
  feedback: feedbackReducer,
  posts: postsReducer,
});

export default reducers;
