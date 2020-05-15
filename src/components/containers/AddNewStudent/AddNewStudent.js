import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Aux from "../../hoc/Auxx/Auxx";
import misc from "../../../assets/sass/misc.sass";

class AddNewStudent extends Component {
  state = {
    show: false,
  };

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

  render() {
    let isShowModal;
    if (this.state.show) {
      isShowModal = (
        <Modal show={() => this.toggle()} closed={() => this.close()}>
          <form>
            <Input format="text" type="input" placeholder="Имя" />
            <Input format="text" type="input" placeholder="Фамилия" />
            <Input
              format="text"
              type="input"
              placeholder="Дата рождения"
              class="error"
            />
            <Input format="text" type="input" placeholder="Факультет" />
            <Input format="text" type="input" placeholder="Дата поступления" />
            <Input format="text" type="input" placeholder="Курс" />
            <Input format="text" type="textarea" placeholder="Адрес" />
            <Input format="tel" type="input" placeholder="Телефон" />
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

export default AddNewStudent;
