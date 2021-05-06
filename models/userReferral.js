var mongoose = require("mongoose");
var schema = mongoose.Schema;

var userReferralSchema = new mongoose.Schema({
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
  referredBy: {
    type: String,
  },
  referralBonus: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("userReferral", userReferralSchema);
