import { SET_ISDARK } from "../actions/actionTypes";

const themeReducer = (state = false, action) => {
  switch (action.type) {
    case SET_ISDARK:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
