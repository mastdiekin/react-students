import * as actions from "../actions/actionTypes";
import { orderBy } from "lodash";

const initStore = {
  students: [],
  loading: false,
  error: false,
};

const studentsStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.START_STUDENTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.SUCCESS_STUDENTS:
      return {
        ...state,
        students: action.data,
        loading: false,
        error: false,
      };
    case actions.SORT_STUDENTS:
      return {
        ...state,
        sortParams: action.data,
        students: orderBy(state.students, action.by, action.data.order),
        loading: false,
        error: false,
      };
    case actions.ADD_STUDENT_START:
      return {
        ...state,
        loading: true,
        closeModal: true,
        error: false,
      };
    case actions.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.concat(action.newstudent),
        loading: false,
        closeModal: false,
        error: false,
      };
    case actions.ADD_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        closeModal: false,
        error: true,
      };
    case actions.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter((item) => item.id !== action.id),
        loading: false,
        error: false,
      };
    case actions.DELETE_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actions.EDIT_STUDENT_START:
      return {
        ...state,
        loading: true,
        closeModal: true,
        error: false,
      };
    case actions.EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        students: action.data,
        loading: false,
        closeModal: false,
        error: false,
      };
    case actions.EDIT_STUDENT_ERROR:
      console.log("need to add ERROR logic...");
      return {
        ...state,
        loading: false,
        closeModal: false,
        error: true,
      };
    default:
      return state;
  }
};

export default studentsStore;
