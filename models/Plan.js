var mongoose = require("mongoose");
var schema = mongoose.Schema;

var planSchema = new mongoose.Schema({
  planName: {
    type: String,
    require: true,
  },
  planPrice: {
    type: Number,
    require: true,
  },
  planCatchPhrase: {
    type: String,
    require: true,
  },
  planBenefitOne: {
    type: String,
    require: true,
  },
  planBenefitTwo: {
    type: String,
    require: true,
  },
  planBenefitThree: {
    type: String,
    require: true,
  },
  planLevels: {
    type: Number,
    require: true,
  },
  planDownlines: {
    type: Number,
    require: true,
  },
  systemCharge: {
    type: Number,
    require: true,
  },
  affiliateCharge: {
    type: Number,
    require: true,
    //naira
  },
  marketerCharge: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Plan", planSchema);
