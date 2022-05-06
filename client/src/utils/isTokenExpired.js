import jwtDecode from "jwt-decode";

const isTokenExpired = (user) => {
  const token = user?.token;
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    return true;
  } else {
    return false;
  }
};

export default isTokenExpired;
