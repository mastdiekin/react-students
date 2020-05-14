import React from "react";
import classes from "./Menu.sass";

const menu = () => (
  <nav className={classes.Menu}>
    <ul>
      <li>
        <a href="#">Добавить</a>
      </li>
      <li>
        <a href="#">Вход</a>
      </li>
    </ul>
  </nav>
);

export default menu;
