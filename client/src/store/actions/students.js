import * as actionTypes from "./actionTypes";
import { get } from "lodash";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";

export const initStudents = () => {
  return (dispatch) => {
    dispatch(startStudents());

    axios
      .get(api + "/students")
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
    data,
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
  return (dispatch) => {
    dispatch(newStudentStart());
    setTimeout(() => {
      dispatch(newStudentSuccess(newstudent));
      //axios, newStudentError...
    }, 500);
  };
};

export const newStudentSuccess = (newstudent) => {
  return {
    type: actionTypes.ADD_STUDENT_SUCCESS,
    newstudent,
  };
};

export const newStudentError = (error) => {
  return {
    type: actionTypes.ADD_STUDENT_ERROR,
    error,
  };
};
//newStudent end

export const deleteStudent = (id) => {
  return {
    type: actionTypes.DELETE_STUDENT,
    id,
  };
};

export const editStudentStart = () => {
  return {
    type: actionTypes.EDIT_STUDENT_START,
  };
};

export const editStudentSubmit = (id, data) => {
  return (dispatch, getState) => {
    dispatch(editStudentStart());
    setTimeout(() => {
      const newData = getState().students.students.map((el) =>
        el.id === id ? { ...el, ...data } : el
      );
      dispatch(editStudentSuccess(id, newData));
      //axios, editStudentSuccess...
    }, 500);
  };
};

export const editStudentSuccess = (id, data) => {
  return {
    type: actionTypes.EDIT_STUDENT_SUCCESS,
    id,
    data,
  };
};

export const editStudentError = (error) => {
  return {
    type: actionTypes.EDIT_STUDENT_ERROR,
    error,
  };
};
