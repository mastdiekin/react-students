import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Aux from "../../hoc/Auxx/Auxx";
import misc from "../../../assets/sass/misc.sass";
import { checkValid } from "../../hoc/shared/utility";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

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

  state = {
    form: {
      // lName: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Фамилия",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 3,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      name: {
        type: "input",
        format: "text",
        placeholder: "Имя",
        value: "",
        class: "",
        required: true,
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
      },
      // dateB: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Дата рождения",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 1,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      // faculty: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Факультет",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 3,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      // date: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Дата поступления",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 1,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      // course: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Курс",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 1,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      // adress: {
      //   type: "textarea",
      //   format: "text",
      //   placeholder: "Адрес",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 6,
      //   },
      //   valid: false,
      //   touched: false,
      // },
      // phone: {
      //   type: "input",
      //   format: "text",
      //   placeholder: "Телефон",
      //   value: "",
      //   class: "",
      //   required: true,
      //   validation: {
      //     required: true,
      //     minLength: 6,
      //   },
      //   valid: false,
      //   touched: false,
      // },
    },
    show: false,
  };

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
    this.setState({ form: updatedControls });
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
        <a href="#" onClick={(event) => this.toggle(event)}>
          Добавить
        </a>
        {isShowModal}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
