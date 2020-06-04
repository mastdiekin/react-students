import React from "react";
import classes from "./Spinner.sass";

const spinner = (props) => {
  // console.log(props, classes.relative);
  let white = props.white ? classes.white : null;
  let relative = props.relative ? classes.relative : null;
  let no__transform = props.no__transform ? classes.no__transform : null;
  let no__left = props.no__left ? classes.no__left : null;
  return (
    <svg
      className={[
        classes.Spinner,
        props.customClass,
        relative,
        no__transform,
        no__left,
      ].join(" ")}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={[classes.path, white].join(" ")}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};

export default spinner;
