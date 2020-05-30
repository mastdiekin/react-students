import React from "react";
import classes from "./Button.sass";

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, props.btnClass].join(" ")}
    onClick={props.clicked}
    title={props.title}
  >
    {props.children}
  </button>
);

export default button;
