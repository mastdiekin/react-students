import React from "react";
import classes from "./Backdrop.sass";

const backdrop = (props) => (
  <div className={classes.Backdrop}>{props.children}</div>
);

export default backdrop;
