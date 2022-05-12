import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: `5px 0`,
    },
  },
  card: ({ postId, absolutPosition, fixedHeight, withCloseButton, pendingRequest }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: pendingRequest ? "center" : "space-between",
    alignItems: "center",
    position: absolutPosition ? "absolute" : "static",
    padding: `${postId ? "8px" : "16px"}`,
    height: fixedHeight ? (withCloseButton ? "556px" : "500px") : "100%",
    boxSizing: "border-box",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "900px",
  }),
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    columnGap: "15px",
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
