import * as actions from "../actions/actionTypes";
import { sortBy, orderBy } from "lodash";

const initStore = {
  students: [
    {
      id: "z",
      name: "Алексей",
      lname: "Ворошилов",
      year: 1996,
      faculty: "Журналистики",
      dateReceipt: 2012,
      course: "5й",
      adress: "ул. Мойка, 34 дом 15, Санкт-Петербург, 142346",
      phone: "+380 903 230 32 63",
    },
    {
      id: "f",
      name: "Дмитрий",
      lname: "Донцов",
      year: 1995,
      faculty: "Психологии",
      dateReceipt: 2019,
      course: "3й",
      adress: "ул. Новокузнецкая, 40 строение 1, Москва, 115054",
      phone: "+7 999 100 92 23",
    },
    {
      id: "n",
      name: "Василий",
      lname: "Пепелец",
      year: 1990,
      faculty: "Психологии",
      dateReceipt: 2054,
      course: "2й",
      adress: "ул. Тверская, 43, Москва, 3426632",
      phone: "+7 235 548 23 74",
    },
  ],
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
        loading: false,
        error: false,
      };
    case actions.SORT_STUDENTS:
      if (action.blockType !== "table") {
        return {
          ...state,
        };
      } else {
        // console.log(state.students, action.by);
        return {
          ...state,
          students: orderBy(state.students, action.by),
          loading: false,
          error: false,
        };
      }
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
        error: true,
      };
    case actions.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((item) => item.id !== action.id),
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default studentsStore;
