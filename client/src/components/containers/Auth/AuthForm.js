import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import misc from "../../../assets/sass/misc.sass";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Spinner from "../../UI/Spinner/Spinner";

class AuthForm extends Component {
  state = {};

  formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.state.type === "login") {
      this.props.onLoginSubmit(data);
    }

    if (this.state.type === "register") {
      this.props.onRegisterSubmit(data);
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginAction = () => {
    this.setState({
      type: "login",
    });
  };

  registerAction = () => {
    this.setState({
      type: "register",
    });
  };

  render() {
    const form = this.props.users.user ? (
      <p>Вы уже авторизованы...</p>
    ) : (
      <form onSubmit={(e) => this.formSubmit(e)}>
        <input
          onChange={(e) => this.onChange(e)}
          type="email"
          name="email"
          placeholder="Почта"
        />
        <input
          onChange={(e) => this.onChange(e)}
          type="password"
          name="password"
          placeholder="Пароль"
        />
        <Button
          btnClass={[misc.btn, misc.big].join(" ")}
          clicked={this.loginAction}
        >
          Войти
        </Button>
        <Button
          btnClass={[misc.btn, misc.big].join(" ")}
          clicked={this.registerAction}
        >
          Регистрация
        </Button>
      </form>
    );

    return form;
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    error: state.students.error,
    loading: state.students.loading,
    closeModal: state.students.closeModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSubmit: (data) => dispatch(actions.registerSubmit(data)),
    onLoginSubmit: (data) => dispatch(actions.loginSubmit(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
