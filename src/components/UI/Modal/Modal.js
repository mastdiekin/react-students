import React, { Component } from "react";
import classes from "./Modal.sass";
import misc from "../../../assets/sass/misc.sass";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import { backLocationOrCloseModal } from "../../hoc/shared/utility";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return this.props.show ? (
      <div className={classes.Modal}>
        <Backdrop
          show={this.props.show}
          returnBack={this.props.returnBack}
          closed={this.props.closed}
          clicked={() => backLocationOrCloseModal(this.props)}
        />
        <div className={classes.Modal__info}>
          <Button
            btnClass={[classes.Modal__close, misc.btn, misc.close].join(" ")}
            clicked={() => backLocationOrCloseModal(this.props)}
            title="Закрыть"
          ></Button>
          {this.props.children}
        </div>
      </div>
    ) : null;
  }
}

export default Modal;
