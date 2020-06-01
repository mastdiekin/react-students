import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import modalClasses from "../../UI/Modal/Modal.sass";
import Aux from "../../hoc/Auxx/Auxx";
import Header from "../../../components/UI/Header/Header";
import Footer from "../../../components/UI/Footer/Footer";
import Main from "../../../components/UI/Main/Main";
import classes from "./Auth.sass";
import AuthForm from "./AuthForm";

const Auth = (props) => {
  useEffect(() => {
    document.title = "Auth";
  }, []);
  let history = useHistory();

  const form = <AuthForm />;

  return props.showModalByRecievedBg ? (
    <Modal
      show={props.showModalByRecievedBg}
      returnBack={history}
      customClass={modalClasses.Modal__auth}
    >
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
