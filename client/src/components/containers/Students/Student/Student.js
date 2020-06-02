import React, { Component } from "react";
import classes from "./Student.sass";
import misc from "../../../../assets/sass/misc.sass";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import EditStudent from "../../EditStudent/EditStudent";

class Student extends Component {
  state = {
    clicked: false,
    isOpened: false,
  };

  toggleExpand() {
    this.setState((state) => ({
      clicked: !state.clicked,
      isOpened: !state.isOpened,
    }));
  }

  renderSortingDIrection = (by) => {
    return this.props.sortParams &&
      this.props.sortParams.key === by &&
      this.props.type !== "data" ? (
      <span
        className={[
          this.props.sortParams.key,
          misc[this.props.sortParams.order],
        ].join(" ")}
      ></span>
    ) : null;
  };

  render() {
    let typeClass = classes.Student__info;

    let buttons = this.props.isAuth ? (
      <div className={classes.Student__buttons}>
        <EditStudent id={this.props.data.id} />
        <button
          id={classes.detete}
          title="Удалить"
          onClick={() => this.props.onDelete(this.props.data.id)}
        ></button>
      </div>
    ) : null;

    let expand = this.state.isOpened ? (
      <div className={classes.Student__expand}>
        <div className="row">
          <div className="col-12">
            <div className="address">{this.props.data.address}</div>
            <div className="phone">{this.props.data.phone}</div>
          </div>
        </div>
      </div>
    ) : null;
    if (this.props.type === "table") {
      typeClass = [classes.Student__info, classes.table].join(" ");
      buttons = null;
      expand = null;
    }

    if (this.state.isOpened && this.props.type !== "table") {
      typeClass = [classes.Student__info, classes.active].join(" ");
    }

    // console.log("sortParams", this.props.sortParams);

    return (
      <div className={classes.Student__wrapper}>
        <div className={classes.Student} onClick={() => this.toggleExpand()}>
          <div className={typeClass}>
            <div className={["row", misc.fill].join(" ")}>
              <div
                className="col-1 d-flex"
                onClick={() => this.props.onSortTable("id", this.props.type)}
              >
                <div className="id align-self-center">
                  {this.props.data.id}
                  {this.renderSortingDIrection("id")}
                </div>
              </div>
              <div
                className="col-4 d-flex"
                onClick={() => this.props.onSortTable("lName", this.props.type)}
              >
                <div className={[classes.name, "align-self-center"].join(" ")}>
                  <span className="fname">{this.props.data.name}</span>
                  <span className="lname">{this.props.data.lName}</span>
                  <span>{this.renderSortingDIrection("lName")}</span>
                </div>
              </div>
              <div
                className="col-1 d-flex"
                onClick={() => this.props.onSortTable("year", this.props.type)}
              >
                <div className="year align-self-center">
                  {this.props.data.year}
                  {this.renderSortingDIrection("year")}
                </div>
              </div>
              <div
                className="col-3 d-flex"
                onClick={() =>
                  this.props.onSortTable("faculty", this.props.type)
                }
              >
                <div className="faculty align-self-center">
                  {this.props.data.faculty}
                  {this.renderSortingDIrection("faculty")}
                </div>
              </div>
              <div
                className="col-2 d-flex"
                onClick={() =>
                  this.props.onSortTable("dateReceipt", this.props.type)
                }
              >
                <div className="dateReceipt align-self-center">
                  {this.props.data.dateReceipt}
                  {this.renderSortingDIrection("dateReceipt")}
                </div>
              </div>
              <div
                className={["col-1", "d-flex", classes.last].join(" ")}
                onClick={() =>
                  this.props.onSortTable("course", this.props.type)
                }
              >
                <div className="course align-self-center">
                  {this.props.data.course}
                  {this.renderSortingDIrection("course")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {expand}
        {buttons}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    loading: state.students.loading,
    sortParams: state.students.sortParams,
    isAuth: state.users.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => dispatch(actions.deleteStudent(id)),
    onSortTable: (by, blockType) =>
      blockType === "data" ? false : dispatch(actions.sortStudents(by)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
