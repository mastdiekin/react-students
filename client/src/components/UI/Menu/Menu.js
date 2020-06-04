import React from "react";
import classes from "./Menu.sass";
import AddNewStudent from "../../containers/AddNewStudent/AddNewStudent";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Aux from "../../hoc/Auxx/Auxx";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import Logout from "../../containers/Auth/Logout";

const Menu = (props) => {
  let location = useLocation();

  let isLoggedinCanUseThis;

  if (props.users.user !== null) {
    isLoggedinCanUseThis = (
      <Aux>
        <li>
          <AddNewStudent />
        </li>
        <li>
          <Logout />
        </li>
      </Aux>
    );
  } else {
    if (props.users.loading) {
      isLoggedinCanUseThis = <Spinner white />;
    } else {
      isLoggedinCanUseThis = (
        <Aux>
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
        </Aux>
      );
    }
  }

  return (
    <nav className={classes.Menu}>
      <ul>{isLoggedinCanUseThis}</ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    error: state.students.error,
    loading: state.students.loading,
  };
};

export default connect(mapStateToProps)(Menu);
