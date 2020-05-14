import * as actions from "../actions/actionTypes";

const initStore = {
  students: {
    sdf: {
      id: Math.floor(Math.random(24) * 20),
      name: "Алексей",
      lname: "Ворошилов",
      year: 1996,
      age: 24,
      faculty: "Журналистики",
      course: "5й",
      adress: "ул. Мойка, 34 дом 15, Санкт-Петербург, 142346",
      phone: "+380 903 230 32 63",
    },
    sdf4lk6: {
      id: Math.floor(Math.random(24) * 20),
      name: "Дмитрий",
      lname: "Донцов",
      year: 1995,
      age: 23,
      faculty: "Психологии",
      course: "3й",
      adress: "ул. Новокузнецкая, 40 строение 1, Москва, 115054",
      phone: "+7 999 100 92 23",
    },
  },
};

const studentsStore = (state = initStore, action) => {
  switch (action.type) {
    case actions.INIT_STUDENTS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default studentsStore;
