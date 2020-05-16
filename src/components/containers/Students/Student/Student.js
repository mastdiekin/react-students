import React, { Component } from "react";
import classes from "./Student.sass";
import misc from "../../../../assets/sass/misc.sass";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";

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

  // sortTable = (by) => {
  //   if (this.props.type !== "table") {
  //     return false;
  //   }

  //   sortBy()

  //   console.log(by, this.props.students);
  // };

  render() {
    let typeClass = classes.Student__info;
    let buttons = (
      <div className={classes.Student__buttons}>
        <button id={classes.edit} title="Изменить"></button>
        <button
          id={classes.detete}
          title="Удалить"
          onClick={() => this.props.onDelete(this.props.data.id)}
        ></button>
      </div>
    );
    let expand = this.state.isOpened ? (
      <div className={classes.Student__expand}>
        <div className="row">
          <div className="col-12">
            <div className="adress">{this.props.data.adress}</div>
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

    return (
      <div className={classes.Student__wrapper}>
        <div className={classes.Student} onClick={() => this.toggleExpand()}>
          <div className={typeClass}>
            <div className={["row", misc.fill].join(" ")}>
              <div
                className="col-1 d-flex"
                onClick={() => this.props.onSortTable("id", this.props.type)}
              >
                <div className="id align-self-center">{this.props.data.id}</div>
              </div>
              <div
                className="col-4 d-flex"
                onClick={() => this.props.onSortTable("lname", this.props.type)}
              >
                <div className={[classes.name, "align-self-center"].join(" ")}>
                  <span className="fname">{this.props.data.name}</span>
                  <span className="lname">{this.props.data.lname}</span>
                </div>
              </div>
              <div
                className="col-1 d-flex"
                onClick={() => this.props.onSortTable("year", this.props.type)}
              >
                <div className="year align-self-center">
                  {this.props.data.year}
                </div>
              </div>
              <div
                className="col-4 d-flex"
                onClick={() =>
                  this.props.onSortTable("faculty", this.props.type)
                }
              >
                <div className="faculty align-self-center">
                  {this.props.data.faculty}
                </div>
              </div>
              <div
                className="col-1 d-flex"
                onClick={() =>
                  this.props.onSortTable("dateReceipt", this.props.type)
                }
              >
                <div className="dateReceipt align-self-center">
                  {this.props.data.dateReceipt}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => dispatch(actions.deleteStudent(id)),
    onSortTable: (by, blockType) =>
      dispatch(actions.sortStudents(by, blockType)),
  };
};

export default connect(null, mapDispatchToProps)(Student);
