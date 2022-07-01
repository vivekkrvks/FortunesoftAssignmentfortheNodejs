const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieDetailSchema = new Schema({
  
  length: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = MovieDetail = mongoose.model("mystartendlocations", MovieDetailSchema);




