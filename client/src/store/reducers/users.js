import * as actions from "../actions/actionTypes";
// import { orderBy } from "lodash";

const initStore = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  error: false,
  user: null,
};

const usersStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.USER_LOADING:
    case actions.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.user.data,
        error: false,
      };
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.data, //user и token
        isAuthenticated: true,
        loading: false,
        error: false,
        errorMessage: null,
      };
    case actions.LOGIN_ERROR:
    case actions.REGISTER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: true,
        errorMessage: action.errorMessage,
        token: null,
        user: null,
      };
    case actions.LOGOUT_SUCCESS:
    case actions.AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: false,
        errorMessage: null,
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

export default usersStore;
