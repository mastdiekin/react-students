import React, { Component } from "react";
import * as actions from "./store/actions";
import { connect } from "react-redux";

class UserAuth extends Component {
  state = {
    token: localStorage.getItem("token"),
  };

  componentDidMount() {
    this.props.onInitAuthUser(this.state.token);
  }
  render() {
    return null;
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
    onInitAuthUser: (token) => dispatch(actions.initAuthUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
