import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./index.sass";
import "./assets/css/bootstrap-theme.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import studentsStore from "./store/reducers/students";
import usersStore from "./store/reducers/users";
import searchStore from "./store/reducers/search";
import { createLogger } from "redux-logger";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  students: studentsStore,
  users: usersStore,
  search: searchStore,
});

const logger = createLogger({
  // diff: true,
  duration: true,
});

const store = createStore(
  rootReducer,
  // applyMiddleware(logger),
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
