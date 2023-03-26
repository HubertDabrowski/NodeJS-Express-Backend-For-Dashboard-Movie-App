const mongoose = require("mongoose");

const Movie = new mongoose.Schema({
  title: {type: String, required: true},
  director: {type: String, required: true},
  img: {type: String, required: true},
  year: {type: Number, required: true},
  cost: {type: Number, required: true},
  desc: {type: String, default: "No description yet."},
  genre: {type: String},
  video_URL: {type: String, required: true}
  }
);

module.exports = mongoose.model("Movie", Movie);