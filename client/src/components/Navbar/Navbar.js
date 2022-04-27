import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import gamoriesLogo from "../../images/gamories_logo.png";
import gamoriesText from "../../images/gamories_text.png";
import gamoriesTagline from "../../images/gamories_tagline.png";
import useStyles from "./styles";
import { logout } from "../../actions/authAction";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [dispatch, location, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={gamoriesText} alt="gamories icon" height="45px" />
        <img className={classes.image} src={gamoriesLogo} alt="gamories logo" height="40px" />
        <img className={classes.tagline} src={gamoriesTagline} alt="gamories tagline" height="20px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          location.pathname !== "/auth" && (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
