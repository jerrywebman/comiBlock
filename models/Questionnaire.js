var mongoose = require("mongoose");
var schema = mongoose.Schema;

var questionnaireSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
    match: /.+\@.+\..+/,
    unique: true,
    min: 6,
    max: 255,
  },
  userFirstname: {
    type: String,
    require: true,
    min: 2,
    max: 255,
  },
  assessmentOne: {
    type: Object,
    require: true,
  },
  assessmentTwo: {
    type: Object,
    require: true,
  },
  assessmentThree: {
    type: Object,
    require: true,
  },
  assessmentFour: {
    type: Object,
    require: true,
  },
  riskOne: {
    type: Object,
    require: true,
  },
  riskTwo: {
    type: Object,
    require: true,
  },
  riskThree: {
    type: Object,
    require: true,
  },
  riskFour: {
    type: Object,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Questionnaire", questionnaireSchema);
