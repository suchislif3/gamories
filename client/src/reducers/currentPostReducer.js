import {
  CHANGE_CURRENT_POST_ID,
  CHANGE_CURRENT_POST_DATA,
  CHANGE_CURRENT_POST_INPUTERROR,
  CLEAR_POST
} from "../actions/actionTypes";

const initialPost = {
  id: null,
  data: {
    title: "",
    description: "",
    tags: "",
    selectedFile: "",
  },
  inputError: false,
};

const currentPostReducer = (state = initialPost, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_POST_ID:
      return { ...state, id: action.payload };
    case CHANGE_CURRENT_POST_DATA:
      return { ...state, data: action.payload };
    case CHANGE_CURRENT_POST_INPUTERROR:
      return { ...state, inputError: action.payload };
    case CLEAR_POST:
      return initialPost;
    default:
      return state;
  }
};

export default currentPostReducer;
