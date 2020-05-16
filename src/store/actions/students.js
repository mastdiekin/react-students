import * as actionTypes from "./actionTypes";

export const initStudents = () => {
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

export const sortStudents = (by, blockType) => {
  return {
    type: actionTypes.SORT_STUDENTS,
    by,
    blockType,
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
