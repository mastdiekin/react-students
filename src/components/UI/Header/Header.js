import React, { Component } from "react";
import classes from "./Header.sass";

import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import Menu from "../Menu/Menu";

class Header extends Component {
  render() {
    return (
      <header className={classes.Header}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 d-flex">
              <Logo />
              <Nav />
            </div>
            <div className="col-sm-5">
              <Menu />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
