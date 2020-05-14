import React from "react";
import Home from "./components/Home/Home";
import Students from "./components/containers/Students/Students";
import Wrapper from "./components/UI/Wrapper/Wrapper";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Wrapper>
        <Switch>
          <Route path="/students" component={Students} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Wrapper>
    </div>
  );
}

export default App;
