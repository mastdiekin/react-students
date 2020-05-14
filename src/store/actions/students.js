import * as actionTypes from "./actionTypes";

export const initStudents = () => {
  return {
    type: actionTypes.INIT_STUDENTS,
  };
};

export const deleteStudent = (id) => {
  return {
    type: actionTypes.DELETE_STUDENT,
    id,
  };
};
