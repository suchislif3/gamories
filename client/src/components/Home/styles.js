import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
