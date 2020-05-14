import * as actions from "../actions/actionTypes";

const initStore = {
  students: [
    {
      id: "asdasdsa",
      name: "Алексей",
      lname: "Ворошилов",
      year: 1996,
      age: 24,
      faculty: "Журналистики",
      course: "5й",
      adress: "ул. Мойка, 34 дом 15, Санкт-Петербург, 142346",
      phone: "+380 903 230 32 63",
    },
    {
      id: "aasd546",
      name: "Дмитрий",
      lname: "Донцов",
      year: 1995,
      age: 23,
      faculty: "Психологии",
      course: "3й",
      adress: "ул. Новокузнецкая, 40 строение 1, Москва, 115054",
      phone: "+7 999 100 92 23",
    },
    {
      id: "asdasge457",
      name: "Василий",
      lname: "Пепелец",
      year: 1990,
      age: 30,
      faculty: "Психологии",
      course: "2й",
      adress: "ул. Тверская, 43, Москва, 3426632",
      phone: "+7 235 548 23 74",
    },
  ],
  loading: false,
};

const studentsStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.START_STUDENTS:
      return {
        ...state,
        loading: true,
      };
    case actions.SUCCESS_STUDENTS:
      return {
        ...state,
        loading: false,
      };
    case actions.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((item) => item.id !== action.id),
        loading: false,
      };
    default:
      return state;
  }
};

export default studentsStore;
