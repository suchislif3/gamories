import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../actions/actionTypes";

const posts = [];

const postsReducer = (state = posts, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post) => post._id !== action.payload)
    default:
      return state;
  }
};

export default postsReducer;
