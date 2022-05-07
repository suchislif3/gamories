import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: `5px 0`,
    },
  },
  card: ({ postId, absolutPosition, fixedHeight, withCloseButton }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: absolutPosition ? "absolute" : "static",
    padding: `${postId ? "8px" : "16px"}`,
    height: fixedHeight ? (withCloseButton ? "500px" : "464px") : "100%",
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
    width: "100%",
    margin: "10px 0",
    "& input[type=file]::file-selector-button": {
      padding: ".2em .4em",
    },
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
