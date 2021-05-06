var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userSummarySchema = new mongoose.Schema({
  _id: {
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
  averageTradeTime: {
    type: Number,
    require: true,
  },
  totalBtcBought: {
    type: Number,
    require: true,
  },
  totalUsdtBought: {
    type: Number,
    require: true,
  },
  totalEthBought: {
    type: Number,
    require: true,
  },
  totalBtcSold: {
    type: Number,
    require: true,
  },
  totalUsdtSold: {
    type: Number,
    require: true,
  },
  totalEthSold: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("userSummary", userSummarySchema);
