import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import gamoriesFourOhFour from "../../images/gamories_404.png";
import gamoriesFourOhFourDark from "../../images/gamories_404_dark.png";

const NotFound = () => {
  const classes = useStyles();
  const isDark = useSelector((state) => state.isDark);
  return (
    <div className={classes.container}>
      <img
        src={isDark ? gamoriesFourOhFourDark : gamoriesFourOhFour}
        alt="404 icon"
      />
      <p>we’re sorry, the gamories of this page don't exist</p>
    </div>
  );
};

export default NotFound;
