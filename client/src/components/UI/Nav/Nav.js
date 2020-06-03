import React from "react";
import classes from "./Nav.sass";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

const Nav = (props) => {
  const history = useHistory();
  const clicked = (e) => {
    e.preventDefault();
    history.push("/students");
    props.onInitStudents(1);
  };

  return (
    <nav className={classes.Nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} exact to="/">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={classes.active}
            onClick={(e) => clicked(e)}
            to="/students"
          >
            Студенты
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    loading: state.students.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStudents: (page) => dispatch(actions.initStudents(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
