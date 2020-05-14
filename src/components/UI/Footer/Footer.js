import React from "react";
import classes from "./Footer.sass";

const footer = () => (
  <footer className={classes.Footer}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <nav className={classes.Footer__links}>
            <ul>
              <li>
                <a href="#">Footer link</a>
              </li>
              <li>
                <a href="#">Footer link</a>
              </li>
              <li>
                <a href="#">Footer link</a>
              </li>
              <li>
                <a href="#">Footer link</a>
              </li>
              <li>
                <a href="#">Footer link</a>
              </li>
            </ul>
          </nav>
          <div className={classes.Footer__copy}>v0.1 &copy; 2020</div>
        </div>
      </div>
    </div>
  </footer>
);

export default footer;
