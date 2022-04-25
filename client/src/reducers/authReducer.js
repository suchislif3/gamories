import { AUTH, LOGOUT } from "../actions/actionTypes";

const authReducer = (state = JSON.parse(localStorage.getItem("profile")), action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return action?.data;
    case LOGOUT:
      localStorage.removeItem("profile");
      return null;
    default:
      return state;
  }
};

export default authReducer;
