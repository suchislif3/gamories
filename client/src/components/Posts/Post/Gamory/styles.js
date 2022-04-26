import { makeStyles } from "@material-ui/core";

export default makeStyles({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    minHeight: "456px",
    position: "relative",
    transform: ({ isEdit }) => isEdit ? "rotateY(90deg)" : "rotateY(0deg)",
    transitionDelay: ({ isEdit }) => (isEdit ? "0s" : "0.1s"),
    transition: "all ease-in 0.1s",
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
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 4px",
  },
  description: {
    padding: "0 4px",
    overflowWrap: "break-word",
  },
  cardActions: {
    padding: "0 15px 8px 15px",
    display: "flex",
    justifyContent: "space-between",
  },
});
