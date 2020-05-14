import * as actionTypes from "./actionTypes";

export const initStudents = (dispatch) => {
  return (dispatch) => {
    dispatch(startStudents());
    setTimeout(() => {
      dispatch(successStudents());
    }, 500);
  };
};

export const startStudents = () => {
  return {
    type: actionTypes.START_STUDENTS,
  };
};

export const successStudents = () => {
  return {
    type: actionTypes.SUCCESS_STUDENTS,
  };
};

export const deleteStudent = (id) => {
  return {
    type: actionTypes.DELETE_STUDENT,
    id,
  };
};
