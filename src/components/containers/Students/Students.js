import React, { Component } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import Main from "../../UI/Main/Main";
import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import Student from "./Student/Student";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

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
          lname: "Фамилия",
          year: "Год",
          age: "Возраст",
          faculty: "Факультет",
          course: "Курс",
        }}
        type="table"
      />
    );

    return (
      <Aux>
        <Header />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="Students">
                  {staticStudentsTable}
                  {elementsArray.map((el, index) => {
                    return (
                      <Student
                        key={el.id}
                        id={index}
                        data={this.props.students[el.id]}
                        type="data"
                      />
                    );
                  })}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStudents: () => dispatch(actions.initStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
