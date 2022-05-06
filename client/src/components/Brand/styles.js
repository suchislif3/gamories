import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  brandContainer: ({ addMarginTop, addPaddingBottom, centered }) => ({
    display: "flex",
    alignItems: "flex-end",
    justifyContent: centered ? "center" : "",
    columnGap: "20px",
    rowGap: "10px",
    flexWrap: "wrap",
    marginTop: addMarginTop ? "50px" : "0",
    paddingBottom: addPaddingBottom ? "50px" : "0",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  }),
  text: ({ addOpacity }) => ({
    opacity: addOpacity ? 0.3 : 1,
    height: "45px",
  }),
  image: ({ addOpacity }) => ({
    height: "40px",
    opacity: addOpacity ? 0.25 : 1,
  }),
}));
