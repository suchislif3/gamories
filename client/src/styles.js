import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1px",
      paddingRight: "1px",
    },
  },
}));