import * as actionTypes from "./actionTypes";
import { get } from "lodash";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";

let token = localStorage.getItem("token");
let axiosDataConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

//student inside start
export const initStudentInside = (id) => {
  return (dispatch) => {
    dispatch(startStudentInside());
    axios
      .get(api + "/students/" + id, { id })
      .then((response) => {
        dispatch(successStudentInside(response.data));
      })
      .catch((err) => console.log(err));
  };
};
export const startStudentInside = () => {
  return {
    type: actionTypes.START_STUDENT_INSIDE,
  };
};
export const successStudentInside = (data) => {
  return {
    type: actionTypes.SUCCESS_STUDENT_INSIDE,
    data: data,
  };
};
//student inside end

export const initStudents = (page = 1) => {
  return (dispatch) => {
    dispatch(startStudents());

    axios
      .post(api + "/students", { page })
      .then((response) => {
        dispatch(successStudents(response.data));
      })
      .catch((err) => console.log(err));
  };
};

export const startStudents = () => {
  return {
    type: actionTypes.START_STUDENTS,
  };
};

export const successStudents = (data) => {
  return {
    type: actionTypes.SUCCESS_STUDENTS,
    data: data.data,
    currentPage: data.currentPage,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
    nextPage: data.nextPage,
    prevPage: data.prevPage,
    lastPage: data.lastPage,
    totalItems: data.totalItems,
    postsPerPage: data.postsPerPage,
  };
};

export const sortStudents = (by) => {
  return (dispatch, getState) => {
    const { sortParams } = getState().students;
    const order = get(sortParams, "order");
    dispatch({
      type: actionTypes.SORT_STUDENTS,
      by,
      data: {
        key: by,
        order: order === "desc" ? "asc" : "desc",
      },
    });
  };
};

//newStudent start
export const newStudentStart = () => {
  return {
    type: actionTypes.ADD_STUDENT_START,
  };
};

export const newStudent = (newstudent) => {
  return (dispatch, getState) => {
    axiosDataConfig.headers.Authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    dispatch(newStudentStart());
    const body = JSON.stringify({ newstudent });
    axios
      .post(api + "/students/add", body, axiosDataConfig)
      .then((response) => {
        dispatch(newStudentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(
          newStudentError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const newStudentSuccess = (newstudent) => {
  return {
    type: actionTypes.ADD_STUDENT_SUCCESS,
    newstudent,
  };
};

export const newStudentError = (error, errorMessage) => {
  return {
    type: actionTypes.ADD_STUDENT_ERROR,
    error,
    errorMessage,
  };
};
//newStudent end

export const deleteStudent = (id) => {
  return (dispatch, getState) => {
    const body = JSON.stringify({ id });
    axiosDataConfig.headers.Authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    axios
      .post(api + "/students/" + id + "/delete", body, axiosDataConfig)
      .then((response) => {
        dispatch(deleteStudentSuccess(response.data));
      })
      .catch((err) => {
        dispatch(
          deleteStudentError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const deleteStudentSuccess = (deletedStudent) => {
  return {
    type: actionTypes.DELETE_STUDENT_SUCCESS,
    id: deletedStudent.id,
  };
};

export const deleteStudentError = (error, errorMessage) => {
  return {
    type: actionTypes.DELETE_STUDENT_ERROR,
    error,
    errorMessage,
  };
};

export const editStudentStart = () => {
  return {
    type: actionTypes.EDIT_STUDENT_START,
  };
};

export const editStudentSubmit = (id, data) => {
  return (dispatch, getState) => {
    axiosDataConfig.headers.Authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    dispatch(editStudentStart());
    const body = JSON.stringify({ data });
    axios
      .post(api + "/students/" + id + "/edit", body, axiosDataConfig)
      .then((response) => {
        const newData = getState().students.students.map((el) =>
          el.id === id ? { ...el, ...response.data } : el
        );
        dispatch(editStudentSuccess(id, newData));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(
          editStudentError(err.response.data.error, err.response.data.message)
        );
      });
  };
};

export const editStudentSuccess = (id, data) => {
  return {
    type: actionTypes.EDIT_STUDENT_SUCCESS,
    id,
    data,
  };
};

export const editStudentError = (error, errorMessage) => {
  return {
    type: actionTypes.EDIT_STUDENT_ERROR,
    error,
    errorMessage,
  };
};

export const clearStudentError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};
