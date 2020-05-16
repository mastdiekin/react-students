import React from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";
import Header from "../../../components/UI/Header/Header";
import Footer from "../../../components/UI/Footer/Footer";
import Main from "../../../components/UI/Main/Main";

const form = (
  <Aux>
    Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные
    тексты. Они рот о однажды сбить лучше заголовок одна переулка моей коварный.
  </Aux>
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
