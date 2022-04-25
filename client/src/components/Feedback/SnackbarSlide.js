import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Slide } from "@material-ui/core";
import { closeSnackBar } from "../../actions/feedbackAction";

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};

const SnackbarSlide = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.feedback.snackBar);

  return (
    <Snackbar
      open={open}
      onClose={() => dispatch(closeSnackBar())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      message={message}
      key={message}
      autoHideDuration={5000}
    />
  );
};

export default SnackbarSlide;
