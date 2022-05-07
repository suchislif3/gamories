import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: "16px",
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  chipInput: {
    margin: "10px 0",
  },
  container: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  gridContainer: {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
}));
