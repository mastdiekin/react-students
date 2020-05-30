import React from "react";
import classes from "./Logo.sass";
import logoImage from "../../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

const logo = () => (
  <div className={classes.Logo}>
    <NavLink to="/">
      <img src={logoImage} alt="" />
    </NavLink>
  </div>
);

export default logo;
