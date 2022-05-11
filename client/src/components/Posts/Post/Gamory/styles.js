import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    minHeight: "500px",
    position: "relative",
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
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    rowGap: "15px",
    paddingTop: "12px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  gameContainer: {
    display: "flex",
    columnGap: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  deleteIcon: {
    color: theme.palette.secondary.main,
  },
  description: {
    overflowWrap: "break-word",
  },
  cardActions: {
    padding: "0 15px 15px 15px",
    display: "flex",
    justifyContent: "space-between",
    justifySelf: "flex-end",
  },
}));
