import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

class Logout extends Component {
  render() {
    return (
      <Button clicked={this.props.onLogout}>
        {this.props.users.user.email} Выход
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loading: state.users.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
