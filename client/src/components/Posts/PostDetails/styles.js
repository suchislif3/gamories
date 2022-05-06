import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "15px",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  mainSection: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
  },
  gamory: {
    display: "flex",
    width: "100%",
    marginTop: "10px",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "20px",
    flex: 1,
  },
  imageSection: {
    flex: 2,
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  media: {
    borderRadius: "20px",
    maxWidth: "100%",
  },
  subSection: {
    display: "flex",
    flexDirection: "column",
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  cardActions: {
    padding: "0 0 8px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
}));
