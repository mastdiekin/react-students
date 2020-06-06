import React, { Component } from "react";
import Aux from "../../../hoc/Auxx/Auxx";
import Header from "../../../UI/Header/Header";
import Main from "../../../UI/Main/Main";
import Footer from "../../../UI/Footer/Footer";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../../UI/Spinner/Spinner";
import classes from "./StudentSingle.sass";
import misc from "../../../../assets/sass/misc.sass";

class StudentSingle extends Component {
  componentDidMount() {
    if (!this.props.loading) {
      this.props.onInitStudentInside(this.props.match.params.id);
    }
  }

  componentDidUpdate() {
    if (this.props.students) {
      document.title = `${this.props.students.name} ${this.props.students.lName}`;
    }
  }

  render() {
    let getDataStudent;
    if (this.props.students) {
      const {
        address,
        age,
        course,
        dateReceipt,
        faculty,
        lName,
        name,
        phone,
        photo,
        year,
      } = this.props.students;

      getDataStudent = (
        <div className={classes.Student__inside}>
          <div className={misc.content}>
            <div className={classes.Student__inside__data}>
              <span>Имя: </span> {name}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Фамилия: </span> {lName}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Год рождения: </span> {year}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Возраст: </span> {age}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Курс: </span> {course}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Дата поступления: </span> {dateReceipt}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Факультет: </span> {faculty}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Телефон: </span> {phone}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Фото: </span> {photo}
            </div>
            <div className={classes.Student__inside__data}>
              <span>Адрес: </span> {address}
            </div>
          </div>
        </div>
      );
    }

    if (this.props.loading) {
      getDataStudent = <Spinner relative />;
    }

    return (
      <Aux>
        <Header />
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-12">{getDataStudent}</div>
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
    onInitStudentInside: (id) => dispatch(actions.initStudentInside(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSingle);
