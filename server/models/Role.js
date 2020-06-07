const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  caps: {
    canEdit: {
      type: Boolean,
      required: true,
    },
    canAdd: {
      type: Boolean,
      required: true,
    },
    canDelete: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = mongoose.model("Role", Role);
