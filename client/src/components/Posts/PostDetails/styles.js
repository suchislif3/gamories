import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: "20px",
    borderRadius: "15px",
  },
  media: {
    borderRadius: "20px",
    //objectFit: "cover",
    width: "100%",
    //maxHeight: "600px",
    margin: "10px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
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
  },
  imageSection: {
    flex: 2,
    marginRight: "20px",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
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
