var mongoose = require("mongoose");
var schema = mongoose.Schema;

var portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  intro: {
    type: String,
    require: true,
  },
  briefing: {
    type: String,
    require: true,
  },
  strategySnapshot: {
    type: String,
    require: true,
  },
  holdings: {
    type: Array,
    require: true,
  },
  portfolioStrategy: {
    type: String,
    require: true,
  },
  portfolioType: {
    type: String,
    require: true,
  },
  subcription: {
    type: String,
    require: true,
  },
  subcriptionAmount: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
