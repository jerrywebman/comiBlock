var mongoose = require("mongoose");
var schema = mongoose.Schema;

var schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    require: true,
  },
  schoolAddress: {
    type: String,
    require: true,
  },
  schoolPhone: {
    type: Number,
    require: true,
  },
  schoolEmail: {
    type: String,
    require: true,
  },
  schoolBankName: {
    type: String,
    require: true,
  },
  schoolAccountName: {
    type: String,
    require: true,
  },
  schoolAccountNumber: {
    type: Number,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("School", schoolSchema);
