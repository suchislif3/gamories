import * as api from "../api";
import { AUTH, LOGOUT } from "../actions/actionTypes";

export const auth = (result, token) => {
  return { type: AUTH, data: { result, token } };
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = () => {
  return { type: LOGOUT };
};
