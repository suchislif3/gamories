import React from "react";
import useStyles from "./styles";
import gamoriesLogo from "../../images/gamories_logo.png";
import gamoriesText from "../../images/gamories_text.png";
import gamoriesTagline from "../../images/gamories_tagline.png";

const Brand = ({ tagline, addMarginTop, addOpacity }) => {
  const classes = useStyles({ addMarginTop, addOpacity });
  return (
    <div className={classes.brandContainer}>
      <img
        className={classes.text}
        src={gamoriesText}
        alt="gamories icon"
      />
      <img className={classes.image} src={gamoriesLogo} alt="gamories logo" />
      {tagline && (
        <img
          className={classes.tagline}
          src={gamoriesTagline}
          alt="gamories tagline"
        />
      )}
    </div>
  );
};

export default Brand;
