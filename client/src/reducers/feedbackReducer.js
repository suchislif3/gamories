import { OPEN_DIALOG, CLOSE_DIALOG, OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../actions/actionTypes";

const initialDialog = {
  open: false,
  title: "",
  message: "",
  buttonAgree: "OK",
  buttonDisagree: "CANCEL",
};

const initialSnackbar = {
  open: false,
  message: "",
};

const feedbackReducer = (
  state = { dialog: initialDialog, snackBar: initialSnackbar },
  action
) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return { ...state, dialog: { ...state.dialog, open: true, ...action.payload } };
    case CLOSE_DIALOG:
      return { ...state, dialog: initialDialog };
    case OPEN_SNACKBAR:
      return { ...state, snackBar: { open: true, message: action.payload } };
    case CLOSE_SNACKBAR:
      return { ...state, snackBar: initialSnackbar };
    default:
      return state;
  }
};

export default feedbackReducer;
