import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";
import Header from "../../../components/UI/Header/Header";
import Footer from "../../../components/UI/Footer/Footer";
import Main from "../../../components/UI/Main/Main";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./Auth.sass";
import misc from "../../../assets/sass/misc.sass";

const form = (
  <form>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <Button btnClass={[misc.btn, misc.big].join(" ")}>Войти</Button>
  </form>
);

const Auth = (props) => {
  useEffect(() => {
    document.title = "Auth";
  }, []);
  let history = useHistory();
  return props.showModalByRecievedBg ? (
    <Modal show={props.showModalByRecievedBg} returnBack={history}>
      {form}
    </Modal>
  ) : (
    <Aux>
      <Header />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={classes.Auth}>{form}</div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </Aux>
  );
};

export default Auth;
