import React, { Component } from "react";
import classes from "./Student.sass";
import misc from "../../../../assets/sass/misc.sass";

class Student extends Component {
  expanded = () => (
    <div className={classes.Student__expand}>
      <div className="row">
        <div className="col-12">
          <div className="adress">
            ул. Новокузнецкая, 40 строение 1, Москва, 115054
          </div>
          <div className="phone">+7 999 100 92 10</div>
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
              <div className="id align-self-center">1</div>
            </div>
            <div className="col-4 d-flex">
              <div className="name align-self-center">
                <span className="fname">Алексей</span>
                <span className="lname">Ворошилов</span>
              </div>
            </div>
            <div className="col-1 d-flex">
              <div className="year align-self-center">1996</div>
            </div>
            <div className="col-1 d-flex">
              <div className="age align-self-center">24</div>
            </div>
            <div className="col-4 d-flex">
              <div className="faculty align-self-center">Журналистики</div>
            </div>
            <div className="col-1 d-flex last">
              <div className="course align-self-center">5й</div>
            </div>
          </div>
          <div className={classes.Student__buttons}>
            <button id={classes.edit} title="Изменить"></button>
            <button id={classes.detete} title="Удалить"></button>
          </div>
        </div>
        {/* {this.expanded()} */}
      </div>
    );
  }
}

export default Student;
