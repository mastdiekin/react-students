import React, { Component } from "react";
import classes from "./Modal.sass";
import misc from "../../../assets/sass/misc.sass";
import Aux from "../../hoc/Auxx/Auxx";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop />
        <div className={classes.Modal}>
          <div className={classes.Modal__info}>
            <button
              className={[classes.Modal__close, misc.btn, misc.close].join(" ")}
            ></button>
            {this.props.children}
          </div>
        </div>
      </Aux>
    );
  }
}

export default Modal;
