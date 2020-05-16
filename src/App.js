import React from "react";
import Home from "./components/Home/Home";
import Students from "./components/containers/Students/Students";
import Auth from "./components/containers/Auth/Auth";
import Modal from "./components/UI/Modal/Modal";
import Fof from "./components/UI/Fof/Fof";
import Wrapper from "./components/UI/Wrapper/Wrapper";
import { Route, Switch, withRouter, useLocation } from "react-router-dom";
import Aux from "./components/hoc/Auxx/Auxx";

const App = (props) => {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Wrapper>
        <MSwitch />
      </Wrapper>
    </div>
  );
};

function MSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
    <Aux>
      <Switch location={background || location}>
        <Route exact path="/" children={<Home />} />
        <Route path="/students" children={<Students />} />
        <Route path="/auth" children={<Auth />} />
        <Route component={Fof} />
      </Switch>
      {background && <Route path="/auth" children={<Auth showModal />} />}
    </Aux>
  );
}

export default withRouter(App);
