import React from "react";
import classes from "./Backdrop.sass";

const backdrop = (props) => {
  if (props.show) {
    if (props.returnBack) {
      return (
        <div
          className={classes.Backdrop}
          onClick={() =>
            props.returnBack.goBack(
              props.returnBack.location.state.background.pathname
            )
          }
        ></div>
      );
    } else {
      return <div className={classes.Backdrop} onClick={props.closed}></div>;
    }
  } else {
    return null;
  }
};

export default backdrop;
