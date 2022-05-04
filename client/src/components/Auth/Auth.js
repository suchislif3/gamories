import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Grow,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Icon from "./Icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { auth, signup, signin } from "../../actions/authAction";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isInputError, setIsInputError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && !formData.name) {
      setIsInputError(prev => ({...prev, name: true}));
      return;
    };
    if (!formData.email) {
      setIsInputError(prev => ({...prev, email: true}));
      return;
    }
    if (!formData.password) {
      setIsInputError(prev => ({...prev, password: true}));
      return;
    }
    if (isSignup && !formData.confirmPassword) {
      setIsInputError(prev => ({...prev, confirmPassword: true}));
      return;
    }
    if (isSignup) {
      dispatch(signup(formData));
    } else {
      dispatch(signin(formData));
    }
  };

  const handleChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    setIsInputError(prevData => ({ ...prevData, [e.target.name]: false }));
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth(result, token));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log("Google Sign In was unsuccessful. Try again later.");
  };

  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="name"
                    label="Name"
                    handleChange={handleChange}
                    autoFocus={isSignup ? true : false}
                    error={isInputError.name}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                autoFocus={isSignup ? false : true}
                type="email"
                error={isInputError.email}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                error={isInputError.password}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                  error={isInputError.confirmPassword}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
