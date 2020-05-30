import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Aux from "../../hoc/Auxx/Auxx";
import misc from "../../../assets/sass/misc.sass";
import { checkValid } from "../../hoc/shared/utility";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import classes from "./EditStudent.sass";
import { find, map } from "lodash";
import { studentState } from "../Auth/utility/auth";

class EditStudent extends Component {
  toggle = (e) => {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
    });
    document.body.style.overflow = "hidden";
    this.editStudentFormReceive();
  };

  close = () => {
    this.setState({
      show: false,
    });
    document.body.style.overflow = "auto";
  };

  state = studentState;

  componentDidUpdate(nextProps) {
    if (nextProps.closeModal) {
      this.setState({ show: false });
    }
  }

  editStudentFormReceive = () => {
    //найдем текущую запись
    const receivedStudent = find(
      this.props.students,
      (o) => o.id === this.props.id
    );
    // console.log(receivedStudent);

    //из текущей формы, сделаем коллекцию, которой присвоим value текущей записи
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        value: receivedStudent[key],
      });
    }
    // console.log(formElementsArray);

    //переберем коллекцию, и подставим значения текущей записи
    let receivedControls = {};
    formElementsArray.map((el) => {
      return (receivedControls[el.id] = {
        ...this.state.form[el.id],
        value: el.value,
        id: el.id,
        valid: true,
        touched: true,
      });
    });

    this.setState({ form: receivedControls, formIsValid: true });
  };

  //   componentDidUpdate() {
  //     console.log(this.state);
  //   }

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

    this.props.onEditStudentSubmit(this.props.id, formData); // NEED LOGIC...........................................
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
          <p className={misc.center}>
            Редактирование анкеты: #
            <span className={misc.big}>{this.props.id}</span>
          </p>
          <div className={classes.EditStudent}>
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
                btnClass={[misc.btn, misc.big].join(" ")}
                disabled={!this.state.formIsValid}
              >
                Изменить
              </Button>
            </form>
          </div>
        </Modal>
      );
    } else {
      isShowModal = null;
    }

    return (
      <Aux>
        <button
          id={classes.edit}
          title="Изменить"
          onClick={(event) => this.toggle(event)}
        ></button>
        {isShowModal}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    loading: state.students.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditStudentSubmit: (id, data) =>
      dispatch(actions.editStudentSubmit(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);
