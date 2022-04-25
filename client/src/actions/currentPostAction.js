import {
  CHANGE_CURRENT_POST_ID,
  CHANGE_CURRENT_POST_DATA,
  CHANGE_CURRENT_POST_INPUTERROR,
  CLEAR_POST,
} from "../actions/actionTypes";

export const changePostId = (id) => {
  return { type: CHANGE_CURRENT_POST_ID, payload: id };
};

export const changePostData = (data) => {
  return { type: CHANGE_CURRENT_POST_DATA, payload: data };
};

export const changePostInputError = (boolean) => {
  return { type: CHANGE_CURRENT_POST_INPUTERROR, payload: boolean };
};

export const clearCurrentPost = () => {
  return { type: CLEAR_POST };
};
