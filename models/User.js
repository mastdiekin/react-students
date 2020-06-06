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
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: new mongoose.Types.ObjectId("5edb4b104be2e31103a26ea2"),
  },
  resetToken: String,
  resetTokenExp: Date,
});

User.plugin(AutoIncrement, { inc_field: "identificator" });

module.exports = mongoose.model("User", User);
