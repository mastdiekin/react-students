import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";

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
          "x-auth-token": token,
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
  };
};

export const loginError = (error, errorMessage) => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGIN_ERROR,
    error,
    errorMessage,
  };
};
//login end

//logout start
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};
//logout end

//register start
export const registerSubmit = (data) => {
  //   axios...
};

export const successRegisterUser = (data) => {
  localStorage.setItem("token", data.token);
  return {
    type: actionTypes.REGISTER_SUCCESS,
    data,
  };
};

export const registerError = (error) => {
  return {
    type: actionTypes.REGISTER_ERROR,
    error,
  };
};
//register end
