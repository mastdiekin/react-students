const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const Student = new Schema({
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  dateReceipt: {
    type: Number,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // userId: { //ВЕРНУТЬ КОГДА БУДУТ ПОЛЬЗОВАТЕЛИ
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

Student.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Student", Student);
