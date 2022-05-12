import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    padding: "10px 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  outerGrid: {
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  mainGrid: {
    flexWrap: "nowrap",
    columnGap: "30px",
    rowGap: "10px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  switchGrid: {
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  brand: {
    [theme.breakpoints.down("md")]: {
      maxWidth: "240px",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    [theme.breakpoints.down("sm")]: {
      margin: "16px 0",
    },
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  userName: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  switchRoot: {
    width: "64px",
    padding: "10px 12px",
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
