import { makeStyles } from "@material-ui/core";

export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    minHeight: "456px",
    position: "relative",
    opacity: ({ isEdit }) => (isEdit ? "0" : "1"),
    pointerEvents: ({ isEdit }) => (isEdit ? "none" : "auto"),
    transition: "all ease-in 0.1s",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
    cursor: "pointer",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  title: {
    padding: "0 4px",
  },
  description: {
    padding: "0 4px",
    overflowWrap: "break-word",
  },
  cardActions: {
    padding: "0 15px 15px 15px",
    display: "flex",
    justifyContent: "space-between",
  },
});
