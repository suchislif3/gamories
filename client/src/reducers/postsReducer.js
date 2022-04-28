import {
  FETCH_INITIAL,
  FETCH_PAGE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../actions/actionTypes";

const initialState = { isLoading: true, data: [] };

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_INITIAL:
      return { ...state, ...action.payload };
    case FETCH_PAGE:
      return { ...state, data: [...state.data, ...action.payload.data], currentPage: action.payload.currentPage};
    case FETCH_BY_SEARCH:
      return { ...state, data: action.payload };
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
    default:
      return state;
  }
};

export default postsReducer;
