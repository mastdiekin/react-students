import * as actions from "../actions/actionTypes";

const initStore = {
  data: null,
  loading: false,
  error: false,
};

const searchStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.SEARCH_START:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: null,
      };
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: false,
        errorMessage: null,
      };

    case actions.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        closeModal: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    case actions.SEARCH_CLEAR:
      return {
        ...state,
        data: null,
        loading: false,
        error: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default searchStore;
