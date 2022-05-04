import React from "react";
import useStyles from "./styles";
import gamoriesLogo from "../../images/gamories_logo.png";
import gamoriesText from "../../images/gamories_text.png";
import gamoriesTagline from "../../images/gamories_tagline.png";
import gamoriesLogoDark from "../../images/gamories_logo_dark.png";
import gamoriesTextDark from "../../images/gamories_text_dark.png";
import gamoriesTaglineDark from "../../images/gamories_tagline_dark.png";
import { useSelector } from "react-redux";

const Brand = ({ tagline, addMarginTop, addPaddingBottom, addOpacity }) => {
  const classes = useStyles({ addMarginTop, addPaddingBottom, addOpacity });
  const isDark = useSelector((state) => state.isDark);
  return (
    <div className={classes.brandContainer}>
      <img
        className={classes.text}
        src={isDark ? gamoriesTextDark : gamoriesText}
        alt="gamories icon"
      />
      <img className={classes.image} src={isDark ? gamoriesLogoDark : gamoriesLogo} alt="gamories logo" />
      {tagline && (
        <img
          className={classes.tagline}
          src={isDark ? gamoriesTaglineDark : gamoriesTagline}
          alt="gamories tagline"
        />
      )}
    </div>
  );
};

export default Brand;
