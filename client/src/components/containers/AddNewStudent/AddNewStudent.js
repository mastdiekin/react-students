import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Aux from "../../hoc/Auxx/Auxx";
import misc from "../../../assets/sass/misc.sass";
import { checkValid } from "../../hoc/shared/utility";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { studentState } from "../Auth/utility/auth";
import aux from "../../hoc/Auxx/Auxx";

class AddNewStudent extends Component {
  toggle = (e) => {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    });
    document.body.style.overflow = "hidden";
  };

  close = () => {
    this.setState({
      show: false,
    });
    document.body.style.overflow = "auto";
  };

  state = studentState;

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.closeModal) {
  //     this.setState({ show: false });
  //   }
  // }

  componentDidUpdate(nextProps) {
    if (nextProps.closeModal) {
      this.setState({ show: false });
    }
  }

  onChangeInput = (event, id) => {
    const updatedControls = {
      ...this.state.form,
      [id]: {
        ...this.state.form[id],
        value: event.target.value,
        valid: checkValid(event.target.value, this.state.form[id].validation),
        touched: true,
      },
    };

    let formIsValid = true;
    for (let inputIds in updatedControls) {
      formIsValid = updatedControls[inputIds].valid && formIsValid;
    }

    this.setState({ form: updatedControls, formIsValid: formIsValid });
  };

  submitForm = (e) => {
    e.preventDefault();
    const formData = {};

    for (let el in this.state.form) {
      formData[el] = this.state.form[el].value;
    }

    this.props.onAddNewStudent(formData);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let isShowModal;
    if (this.state.show) {
      isShowModal = (
        <Modal show={() => this.toggle()} closed={() => this.close()}>
          <form onSubmit={this.submitForm}>
            {formElementsArray.map((el) => (
              <Input
                key={el.id}
                format={el.config.format}
                type={el.config.type}
                placeholder={el.config.placeholder}
                class={el.config.class}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.onChangeInput(event, el.id)}
              />
            ))}
            <Button
              btnClass={["Newstudent__submit", misc.btn, misc.big].join(" ")}
              disabled={!this.state.formIsValid}
            >
              Добавить
            </Button>
          </form>
        </Modal>
      );
    } else {
      isShowModal = null;
    }

    return (
      <Aux>
        {this.props.users.role.caps.canAdd ? (
          <li>
            <a href="#" onClick={(event) => this.toggle(event)}>
              Добавить
            </a>
          </li>
        ) : null}
        {isShowModal}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.user.user,
    students: state.students.students,
    loading: state.students.loading,
    closeModal: state.students.closeModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNewStudent: (data) => dispatch(actions.newStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewStudent);
