import { createTheme } from "@material-ui/core/styles";
import { backgroundImage } from "../constants/constants";

const theme = {
  lightTheme: createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundImage: backgroundImage.light,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          },
        },
      },
    },
  }),

  darkTheme: createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#3CBBE2",
      },
      secondary: {
        main: "#E23C79",
      },
    },
    shadows: [
      ...createTheme({}).shadows.map((shadow) =>
        shadow.replace(/0,0,0/g, "255,255,255")
      ),
    ],
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundImage: backgroundImage.dark,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          },
        },
      },
      /* MuiTextField: {
        root: {
          "& label.Mui-focused": {
            color: "green",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "green",
            },
          },
        },
      }, */
    },
  }),
};

export default theme;
