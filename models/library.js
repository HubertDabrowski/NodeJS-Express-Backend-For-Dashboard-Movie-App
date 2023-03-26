const mongoose = require("mongoose");

const Library = new mongoose.Schema({
  genre: {type: String},
  list: {type: Array}
  }
);

module.exports = mongoose.model("Library", Library);