import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";
import store from "../reducers/users";

const axiosDataConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const initAuthUser = (token) => {
  return (dispatch) => {
    if (!localStorage.getItem("token")) return;
    dispatch(startAuthUser());
    axios
      .post(api + "/users/user", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(successAuthUser(response));
      })
      .catch((err) => {
        dispatch(authUserError(err.response.message));
      });
  };
};

export const successAuthUser = (user) => {
  return {
    type: actionTypes.USER_LOADED,
    user,
    token: localStorage.getItem("token"),
  };
};

export const startAuthUser = () => {
  return {
    type: actionTypes.USER_LOADING,
  };
};

export const authUserError = (error) => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_ERROR,
    error,
    token: null,
  };
};

//login start
export const loginSubmit = (data) => {
  return (dispatch) => {
    dispatch(startLoginUser());
    const body = JSON.stringify({ data });
    axios
      .post(api + "/users/login", body, axiosDataConfig)
      .then((response) => {
        if (!response.data.error) {
          dispatch(successLoginUser(response.data));
        } else {
          dispatch(loginError(response.data.error, response.data.message));
        }
      })
      .catch((err) => {
        dispatch(
          loginError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const startLoginUser = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const successLoginUser = (data) => {
  localStorage.setItem("token", data.token);
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
    token: data.token,
  };
};

export const loginError = (error, errorMessage) => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGIN_ERROR,
    error,
    errorMessage,
    token: null,
  };
};
//login end

//logout start
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    token: null,
  };
};
//logout end

//register start
export const registerSubmit = (data) => {
  return (dispatch) => {
    dispatch(startRegisterUser());
    const body = JSON.stringify({ data });
    axios
      .post(api + "/users/register", body, axiosDataConfig)
      .then((response) => {
        if (!response.data.error) {
          dispatch(successRegisterUser(response.data));
        } else {
          dispatch(registerError(response.data.error, response.data.message));
        }
      })
      .catch((err) => {
        dispatch(
          registerError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const startRegisterUser = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const successRegisterUser = (data) => {
  localStorage.setItem("token", data.token);
  return {
    type: actionTypes.REGISTER_SUCCESS,
    data,
    token: data.token,
  };
};

export const registerError = (error, errorMessage) => {
  return {
    type: actionTypes.REGISTER_ERROR,
    error,
    errorMessage,
    token: null,
  };
};
//register end

export const clearUsersError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
    error: null,
    errorMessage: null,
  };
};
