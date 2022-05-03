import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  card: ({ postId, absolutPosition, fixedHeight }) => ({
    position: absolutPosition ? "absolute" : "static",
    padding: `${postId ? "8px" : "16px"} 16px`,
    height: fixedHeight ? "464px" : "100%",
    boxSizing: "border-box",
    borderRadius: "15px",
    maxWidth: "900px",
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
