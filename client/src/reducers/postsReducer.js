import { FETCH_ALL, CREATE } from "../actions/actionTypes";

const posts = [];

const postsReducer = (state = posts, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default postsReducer;
