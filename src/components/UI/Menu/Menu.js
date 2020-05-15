import React from "react";
import classes from "./Menu.sass";
import AddNewStudent from "../../containers/AddNewStudent/AddNewStudent";

const menu = () => (
  <nav className={classes.Menu}>
    <ul>
      <li>
        <AddNewStudent />
      </li>
      <li>
        <a href="#">Вход</a>
      </li>
    </ul>
  </nav>
);

export default menu;
