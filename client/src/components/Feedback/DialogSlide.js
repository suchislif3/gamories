import * as React from "react";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

import { closeDialog } from "../../actions/feedbackAction";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = () => {
  const dispatch = useDispatch();
  const { open, title, message, buttonAgree, buttonDisagree, confirmAction } =
    useSelector((state) => state.feedback.dialog);

  const handleConfirm = () => {
    confirmAction();
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(closeDialog())}
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirm}
          color={buttonAgree === "DELETE" ? "secondary" : "primary"}
        >
          {buttonAgree}
        </Button>
        <Button onClick={() => dispatch(closeDialog())} color="primary">
          {buttonDisagree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSlide;
