import React, { Component } from "react";
import { connect } from "react-redux";

class AuthIcon extends Component {
  render() {
    let icon;
    switch (this.props.users.role.type) {
      case "administrator":
        icon = "/a/";
        break;

      default:
        icon = "/u/";
        break;
    }
    return <span>{icon}</span>;
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.user.user,
    error: state.users.error,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps)(AuthIcon);
