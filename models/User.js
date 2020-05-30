const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const User = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExp: Date,
});

User.plugin(AutoIncrement, { inc_field: "identificator" });

module.exports = mongoose.model("User", User);
