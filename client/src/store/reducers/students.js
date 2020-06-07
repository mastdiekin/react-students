import * as actions from "../actions/actionTypes";
import { orderBy } from "lodash";

const initStore = {
  students: null,
  loading: false,
  error: false,
};

const studentsStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.START_STUDENT_INSIDE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.SUCCESS_STUDENT_INSIDE:
      return {
        ...state,
        students: action.data,
        loading: false,
        error: false,
      };
    case actions.START_STUDENTS:
      return {
        ...state,
        loading: true,
        error: false,
        currentPage: 1,
        hasNextPage: null,
        hasPrevPage: null,
        nextPage: null,
        prevPage: 0,
        lastPage: null,
        totalItems: null,
        postsPerPage: null,
      };
    case actions.SUCCESS_STUDENTS:
      return {
        ...state,
        students: action.data,
        loading: false,
        error: false,
        currentPage: action.currentPage,
        hasNextPage: action.hasNextPage,
        hasPrevPage: action.hasPrevPage,
        nextPage: action.nextPage,
        prevPage: action.prevPage,
        lastPage: action.lastPage,
        totalItems: action.totalItems,
        postsPerPage: action.postsPerPage,
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
        students: [action.newstudent].concat(state.students),
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
        errorMessage: action.errorMessage,
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
        errorMessage: action.errorMessage,
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
      return {
        ...state,
        loading: false,
        closeModal: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case actions.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        error: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default studentsStore;
