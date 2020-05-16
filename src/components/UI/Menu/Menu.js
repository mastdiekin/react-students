import React from "react";
import classes from "./Menu.sass";
import AddNewStudent from "../../containers/AddNewStudent/AddNewStudent";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Menu = () => {
  let location = useLocation();
  return (
    <nav className={classes.Menu}>
      <ul>
        <li>
          <AddNewStudent />
        </li>
        <li>
          <Link
            to={{
              pathname: "/auth",
              state: { background: location },
            }}
          >
            Вход
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
