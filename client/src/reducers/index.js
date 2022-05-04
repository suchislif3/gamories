import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";
import feedbackReducer from "./feedbackReducer";
import themeReducer from "./themeReducer";

const reducers = combineReducers({
  user: authReducer,
  feedback: feedbackReducer,
  posts: postsReducer,
  isDark: themeReducer,
});

export default reducers;
