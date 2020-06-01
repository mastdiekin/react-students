import React, { Component } from "react";
import classes from "./Modal.sass";
import misc from "../../../assets/sass/misc.sass";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import { backLocationOrCloseModal } from "../../hoc/shared/utility";
import { connect } from "react-redux";

class Modal extends Component {
  state = {
    loading: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.users.loading !== this.props.users.loading ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {
    this.setState({
      loading: this.props.users.loading,
    });
  }

  render() {
    return this.props.show && !this.state.loading ? (
      <div className={[classes.Modal, this.props.customClass].join(" ")}>
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

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(Modal);
