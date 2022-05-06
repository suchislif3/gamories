import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxWidth: "80vw",
    },
    "& p": {
      fontFamily: "'Swanky and Moo Moo', cursive",
      fontSize: "2em",
      textAlign: "center",
      maxWidth: "88vw",
    },
  },
}));
