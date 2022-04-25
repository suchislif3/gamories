import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from "./actionTypes";

export const openDialog = (details) => {
  return { type: OPEN_DIALOG, payload: details };
};

export const closeDialog = () => {
  return { type: CLOSE_DIALOG };
};

export const openSnackBar = (message) => {
  return { type: OPEN_SNACKBAR, payload: message };
};

export const closeSnackBar = () => {
  return { type: CLOSE_SNACKBAR };
};
