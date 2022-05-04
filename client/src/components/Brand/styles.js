import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  brandContainer: ({ addMarginTop, addPaddingBottom }) => ({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: addMarginTop ? "50px" : "0",
    paddingBottom: addPaddingBottom ? "50px" : "0",
  }),
  text: ({ addOpacity }) => ({
    opacity: addOpacity ? 0.3 : 1,
    height: "45px",
  }),
  image: ({ addOpacity }) => ({
    marginLeft: "10px",
    height: "40px",
    opacity: addOpacity ? 0.25 : 1,
  }),
  tagline: {
    marginLeft: "20px",
    marginTop: "20px",
  },
}));
