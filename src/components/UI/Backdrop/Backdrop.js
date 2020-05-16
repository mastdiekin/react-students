import React from "react";
import classes from "./Backdrop.sass";

const backdrop = (props) => {
  const path = props.returnBack.location.state;
  return props.show ? (
    <div
      className={classes.Backdrop}
      onClick={() =>
        props.returnBack
          ? props.returnBack.goBack(
              props.returnBack.location.state.background.pathname
            )
          : props.closed()
      }
    ></div>
  ) : null;
};

export default backdrop;
