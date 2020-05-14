import React, { Component } from "react";
import classes from "./Student.sass";
import misc from "../../../../assets/sass/misc.sass";

class Student extends Component {
  expanded = () => (
    <div className={classes.Student__expand}>
      <div className="row">
        <div className="col-12">
          <div className="adress">{this.props.data.adress}</div>
          <div className="phone">{this.props.data.phone}</div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className={classes.Student}>
        <div className={classes.Student__info}>
          <div className={["row", misc.fill].join(" ")}>
            <div className="col-1 d-flex">
              <div className="id align-self-center">{this.props.data.id}</div>
            </div>
            <div className="col-4 d-flex">
              <div className={[classes.name, "align-self-center"].join(" ")}>
                <span className="fname">{this.props.data.name}</span>
                <span className="lname">{this.props.data.lname}</span>
              </div>
            </div>
            <div className="col-1 d-flex">
              <div className="year align-self-center">
                {this.props.data.year}
              </div>
            </div>
            <div className="col-1 d-flex">
              <div className="age align-self-center">{this.props.data.age}</div>
            </div>
            <div className="col-4 d-flex">
              <div className="faculty align-self-center">
                {this.props.data.faculty}
              </div>
            </div>
            <div className="col-1 d-flex last">
              <div className="course align-self-center">
                {this.props.data.course}
              </div>
            </div>
          </div>
          <div className={classes.Student__buttons}>
            <button id={classes.edit} title="Изменить"></button>
            <button id={classes.detete} title="Удалить"></button>
          </div>
        </div>
        {this.expanded()}
      </div>
    );
  }
}

export default Student;
