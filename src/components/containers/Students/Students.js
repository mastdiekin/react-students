import React, { Component } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import Main from "../../UI/Main/Main";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import Student from "./Student/Student";
import misc from "../../../assets/sass/misc.sass";
import classes from "./Student/Student.sass";

class Students extends Component {
  table = () => (
    <div className={classes.Student}>
      <div className={[classes.Student__info, classes.table].join(" ")}>
        <div className={["row", misc.fill].join(" ")}>
          <div className="col-1 d-flex">
            <div className="id align-self-center">#</div>
          </div>
          <div className="col-4 d-flex">
            <div className="name align-self-center">
              <span className="fname">Имя</span>
              <span className="lname">Фамилия</span>
            </div>
          </div>
          <div className="col-1 d-flex">
            <div className="year align-self-center">Год</div>
          </div>
          <div className="col-1 d-flex">
            <div className="age align-self-center">Возраст</div>
          </div>
          <div className="col-4 d-flex">
            <div className="faculty align-self-center">Факультет</div>
          </div>
          <div className={["col-1", "d-flex", classes.last].join(" ")}>
            <div className="course align-self-center">Курс</div>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <Aux>
        <Header />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="Students">
                  {this.table()}
                  <Student />
                  <Student />
                  <Student />
                  <Student />
                </div>
              </div>
            </div>
          </div>
        </Main>
        <Footer />
      </Aux>
    );
  }
}

export default Students;
