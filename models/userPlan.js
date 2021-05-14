var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userPlanSchema = new mongoose.Schema({
  userPlanAmount: {
    type: Number,
    require: true,
  },
  userPlanName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userUsername: {
    type: String,
    require: true,
  },
  userAccountType: {
    type: String,
    require: true,
  },
  childName: {
    type: String,
    require: true,
  },
  childPhoto: {
    type: String,
    require: true,
  },
  childDOB: {
    type: String,
    require: true,
  },
  childClass: {
    type: String,
    require: true,
  },
  schoolName: {
    type: String,
    require: true,
  },
  schoolAddress: {
    type: String,
    require: true,
  },
  schoolState: {
    type: String,
    require: true,
  },
  schoolEmail: {
    type: String,
    require: true,
  },
  schoolPhoneNumber: {
    type: String,
    require: true,
  },
  schoolAccountName: {
    type: String,
    require: true,
  },
  schoolAccountNumber: {
    type: String,
    require: true,
  },
  schoolBankName: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("userPlan", userPlanSchema);
