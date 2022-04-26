import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: ({ isEdit, postId }) => ({
    position: postId ? "absolute" : "static",
    padding: `${postId ? "8px" : "16px"} 16px`,
    height: postId ? "100%" : "464px",
    boxSizing: "border-box",
    borderRadius: "15px",
    transform: isEdit ? "rotateY(0deg)" : "rotateY(90deg)",
    transitionDelay: isEdit ? "0.1s" : "0s",
    transition: "all ease-in 0.1s",
  }),
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
    "& input[type=file]::file-selector-button": {
      padding: ".2em .4em",
    },
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
