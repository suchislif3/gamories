import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: "16px",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    marginRight: "16px",
  },

  switchRoot: {
    width: "64px",
    padding: "10px 12px",
    marginLeft: "40px",
  },
  switchBase: {
    width: "26px",
    height: "26px",
    top: "50%",
    padding: "4px",
    marginTop: "calc(-26px / 2)",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "!important",
    },
    transform: "translateX(7px) !important",
  },
  switchBaseChecked: {
    transform: "translateX(30px) !important",
    backgroundColor: "#212121",
    "&:hover": {
      backgroundColor: "#212121 !important",
    },
  },
  switchTrack: {
    borderRadius: "20px",
    backgroundColor: theme.palette.primary.main,
  },
}));
