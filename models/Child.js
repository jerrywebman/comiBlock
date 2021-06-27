var mongoose = require("mongoose");
var schema = mongoose.Schema;

var childSchema = new mongoose.Schema({
  parentEmail: {
    type: String,
    require: true,
  },
  parentUsername: {
    type: String,
    require: true,
  },
  parentAccountType: {
    type: String,
    require: true,
  },
  referralCode: {
    type: String,
    require: true,
  },
  childName: {
    type: String,
    require: true,
  },
  childBalance: {
    type: Number,
    require: true,
    default: 0,
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
  childFaculty: {
    type: String,
    require: true,
  },
  childDepartment: {
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
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Child", childSchema);
