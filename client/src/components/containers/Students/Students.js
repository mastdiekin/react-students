import React, { Component } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import Main from "../../UI/Main/Main";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import Student from "./Student/Student";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import misc from "../../../assets/sass/misc.sass";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import Pagination from "../../UI/Pagination/Pagination";

class Students extends Component {
  componentDidMount() {
    this.props.onInitStudents();
    document.title = "Students";
  }

  render() {
    const elementsArray = [];
    for (let key in this.props.students) {
      elementsArray.push({
        id: key,
      });
    }

    const staticStudentsTable = (
      <Student
        key="asd"
        id={"#"}
        data={{
          id: "#",
          name: "Имя",
          lName: "Фамилия",
          year: "Год",
          dateReceipt: "Дата поступл.",
          faculty: "Факультет",
          course: "Курс",
        }}
        type="table"
      />
    );

    let createMapStudents = elementsArray.map((el, index) => {
      return (
        <Student
          key={el.id}
          id={index}
          data={this.props.students[el.id]}
          type="data"
        />
      );
    });

    if (elementsArray.length <= 0) {
      createMapStudents = <p className={misc.center}>Студенты не найдены</p>;
    }

    if (this.props.loading) {
      createMapStudents = <Spinner />;
    }

    return (
      <Aux>
        <Header />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="Students">
                  {staticStudentsTable}
                  {createMapStudents}
                  <Pagination />
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

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    loading: state.students.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStudents: () => dispatch(actions.initStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
