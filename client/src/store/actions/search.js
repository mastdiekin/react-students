import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";

let axiosDataConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const searchChange = (query) => {
  return (dispatch, getState) => {
    dispatch(searchChangeStart());
    const body = JSON.stringify({ q: query });
    axios
      .post(api + "/students/search", body, axiosDataConfig)
      .then((response) => {
        dispatch(searchChangeSuccess(response.data.finded));
      })
      .catch((err) => {
        dispatch(
          searchChangeError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const searchChangeStart = () => {
  return {
    type: actionTypes.SEARCH_START,
  };
};

export const searchChangeSuccess = (data) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    data,
  };
};

export const searchChangeError = (error, errorMessage) => {
  return {
    type: actionTypes.SEARCH_ERROR,
    error,
    errorMessage,
  };
};

export const searchClear = () => {
  return {
    type: actionTypes.SEARCH_CLEAR,
  };
};
