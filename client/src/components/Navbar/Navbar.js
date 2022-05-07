import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import Brightness2TwoToneIcon from "@material-ui/icons/Brightness2TwoTone";
import jwtDecode from "jwt-decode";

import useStyles from "./styles";
import Brand from "../Brand/Brand";
import { logout } from "../../actions/authAction";
import { setIsDark } from "../../actions/themeAction";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const isDark = useSelector((state) => state.isDark);

  const handleLogout = () => {
    dispatch(logout());
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

  const handleChange = () => {
    dispatch(setIsDark(isDark ? false : true));
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Grid
        container
        className={classes.outerGrid}
        spacing={1}
        alignItems="center"
      >
        <Grid
          container
          className={classes.mainGrid}
          item
          xs={12}
          sm={11}
          md={11}
          justifyContent="space-between"
          alignItems="center"
        >
          <div className={classes.brand}>
            <Link to="/">
              <Brand tagline />
            </Link>
          </div>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.avatar}
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
        </Grid>
        <Grid
          container
          className={classes.switchGrid}
          item
          xs={12}
          sm={1}
          md={1}
        >
          <Switch
            checked={isDark}
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              track: classes.switchTrack,
              checked: classes.switchBaseChecked,
            }}
            onChange={handleChange}
            color="primary"
            name="theme-switch"
            icon={<WbSunnyTwoToneIcon className={classes.switchLightIcon} />}
            checkedIcon={
              <Brightness2TwoToneIcon className={classes.switchDarkIcon} />
            }
          />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
