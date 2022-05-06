import store from "../store/store";
import { logout } from "../actions/authAction";
import { openSnackBar } from "../actions/feedbackAction";

const handleExpiredToken = () => {
  store.dispatch(logout());
  store.dispatch(openSnackBar(`Token expired. Please sign in.`));
};

export default handleExpiredToken;
