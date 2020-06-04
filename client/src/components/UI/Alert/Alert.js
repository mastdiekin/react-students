import React, { Component } from "react";
import "./Alert.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import classes from "./Alert.sass";

class Alert extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const { show, type } = this.props;
    let icon;
    switch (this.props.type) {
      case "error":
        icon = (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          </svg>
        );
        break;
      case "success":
        icon = (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
          </svg>
        );
        break;
      case "warning":
        icon = (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
          </svg>
        );
        break;

      default:
        icon = (
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
          </svg>
        );
        break;
    }

    return (
      <TransitionGroup component={null}>
        {show && (
          <CSSTransition classNames="Alert" timeout={300}>
            <div className="Alert--overlay">
              <div className={["Alert", type].join(" ")}>
                <div className="Alert-icon">{icon}</div>
                <div className="Alert-info">{this.props.children}</div>
                <button
                  className="Alert-close"
                  onClick={this.props.onClearError}
                >
                  <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearError: () =>
      dispatch(actions.clearStudentError(), actions.clearUsersError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
