const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const User = new Schema({
  login: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  resetToken: String,
  resetTokenExp: Date,
});

User.plugin(AutoIncrement, { inc_field: "identificator" });

module.exports = mongoose.model("User", User);
