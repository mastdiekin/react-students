import React, { Component } from "react";
import classes from "./Modal.sass";
import misc from "../../../assets/sass/misc.sass";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    if (this.props.show) {
      return (
        <div className={classes.Modal}>
          <Backdrop
            show={this.props.show}
            returnBack={this.props.back}
            closed={this.props.closed}
          />
          <div className={classes.Modal__info}>
            <Button
              btnClass={[classes.Modal__close, misc.btn, misc.close].join(" ")}
              clicked={this.props.closed}
              title="Закрыть"
            ></Button>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Modal;
