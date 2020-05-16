import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";
import Header from "../../../components/UI/Header/Header";
import Footer from "../../../components/UI/Footer/Footer";
import Main from "../../../components/UI/Main/Main";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

const form = (
  <form>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <Button>Войти</Button>
  </form>
);

const Auth = (props) => {
  let history = useHistory();
  if (props.showModal) {
    return (
      <Modal show={props.showModal} back={history}>
        {form}
      </Modal>
    );
  } else {
    return (
      <Aux>
        <Header />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="Students">{form}</div>
              </div>
            </div>
          </div>
        </Main>
        <Footer />
      </Aux>
    );
  }
};

export default Auth;
