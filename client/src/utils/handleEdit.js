import isTokenExpired from "./isTokenExpired";
import handleExpiredToken from "./handleExpiredToken";

const handleEdit = (user, setIsEdit) => {
  if (isTokenExpired(user)) {
    handleExpiredToken();
    return;
  }
  setIsEdit(true);
};

export default handleEdit;
