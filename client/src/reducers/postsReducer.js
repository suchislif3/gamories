import {
  FETCH_INITIAL,
  FETCH_MORE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  CHANGE_HASMORE,
} from "../actions/actionTypes";

const initialState = { isLoading: true, hasMore: true, data: [] };

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_INITIAL:
    case FETCH_BY_SEARCH:
      return { ...state, data: action.payload };
    case FETCH_MORE:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case CREATE:
      return { ...state, data: [action.payload, ...state.data] };
    case UPDATE:
      return {
        ...state,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        data: state.data.filter((post) => post._id !== action.payload),
      };
    case CHANGE_HASMORE:
      return { ...state, hasMore: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
