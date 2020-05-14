import React from "react";
import classes from "./Spinner.sass";

const spinner = () => {
  return (
    <div className={classes.Spinner}>
      <span className={[classes.side, classes.sp_left].join(" ")}>
        <span className={classes.fill}></span>
      </span>
      <span className={[classes.side, classes.sp_right].join(" ")}>
        <span className={classes.fill}></span>
      </span>
    </div>
  );
};

export default spinner;
