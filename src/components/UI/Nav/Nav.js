import React from "react";
import classes from "./Nav.sass";
import { NavLink } from "react-router-dom";

const nav = () => (
  <nav className={classes.Nav}>
    <ul>
      <li>
        <NavLink activeClassName={classes.active} exact to="/">
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.active} to="/students">
          Студенты
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default nav;
