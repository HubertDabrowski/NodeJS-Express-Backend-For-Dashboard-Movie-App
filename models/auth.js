const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  cash: {type: Number, default: 0},
  isAdmin: {type: Boolean, default: false}
  }
);

module.exports = mongoose.model("User", User);