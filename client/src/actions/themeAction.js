import { SET_ISDARK } from "./actionTypes";

export const setIsDark = (newValue) => {
  return { type: SET_ISDARK, payload: newValue };
};
