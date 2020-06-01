import React, { useState } from "react";
import Home from "./components/Home/Home";
import Students from "./components/containers/Students/Students";
import Auth from "./components/containers/Auth/Auth";
import Fof from "./components/UI/Fof/Fof";
import Wrapper from "./components/UI/Wrapper/Wrapper";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import UserAuth from "./userAuth";
import { compose } from "redux";
import { connect } from "react-redux";
import MyRedirect from "./components/UI/MyRedirect/MyRedirect";

const App = (props) => {
  let location = useLocation();
  let history = useHistory();
  const background = location.state && location.state.background;

  let AuthWithBg = props.users.user ? (
    <MyRedirect to="/" redirectHistory={history} />
  ) : (
    <Route path="/auth" children={<Auth showModalByRecievedBg />} />
  );
  // let AuthWithBg = (
  //   <Route path="/auth" children={<Auth showModalByRecievedBg />} />
  // );

  return (
    <div className="App" style={{ height: "100%" }}>
      <UserAuth />
      <Wrapper>
        <Switch location={background || location}>
          <Route exact path="/" children={<Home />} />
          <Route path="/students" children={<Students />} />
          <Route path="/auth" children={<Auth />} />
          {/* {props.users.user ? (
            <MyRedirect to="/" redirectHistory={history} />
          ) : (
            <Route path="/auth" children={<Auth />} />
          )} */}
          <Route component={Fof} />
        </Switch>
        {background && AuthWithBg}
      </Wrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loading: state.users.loading,
  };
};
export default compose(withRouter, connect(mapStateToProps))(App);
