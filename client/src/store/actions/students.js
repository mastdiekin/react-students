import * as actionTypes from "./actionTypes";
import { get } from "lodash";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { api } from "../../components/hoc/shared/utility";
import qs from "qs";

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
    // axios({
    //   method: "POST",
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    //   data: qs.stringify(newstudent),
    //   url: api + "/students/add",
    // })
    //   .then((response) => {
    //     dispatch(newStudentSuccess(response.data));
    //   })
    //   .catch((err) => {
    //     dispatch(newStudentError(err));
    //   });

    axios
      .post(api + "/students/add", qs.stringify(newstudent))
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(newStudentSuccess(response.data));
        } else {
          dispatch(newStudentError(response.data));
        }
      })
      .catch((err) => {
        // console.log(err.data);
        dispatch(newStudentError(err.data));
      });
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
  return (dispatch) => {
    axios({
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(id),
      url: api + "/students/" + id + "/delete",
    }).then((response) => {
      dispatch(deleteStudentSuccess(response.data));
    });
  };
};

export const deleteStudentSuccess = (deletedStudent) => {
  return {
    type: actionTypes.DELETE_STUDENT_SUCCESS,
    id: deletedStudent.id,
  };
};

export const deleteStudentError = (error) => {
  return {
    type: actionTypes.DELETE_STUDENT_ERROR,
    error,
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
    axios
      .post(api + "/students/" + id + "/edit", qs.stringify(data))
      .then((response) => {
        if (response.status === 200) {
          const newData = getState().students.students.map((el) =>
            el.id === id ? { ...el, ...response.data } : el
          );
          dispatch(editStudentSuccess(id, newData));
        } else {
          dispatch(editStudentError(response.data));
        }
      })
      .catch((err) => {
        dispatch(editStudentError(err.data));
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

export const editStudentError = (error) => {
  return {
    type: actionTypes.EDIT_STUDENT_ERROR,
    error,
  };
};
