var mongoose = require("mongoose");
var schema = mongoose.Schema;

var moneySchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  userUsername: {
    type: String,
    require: true,
  },
  userFirstname: {
    type: String,
    require: true,
  },
  userSurname: {
    type: String,
    require: true,
  },
  investmentBalance: {
    type: Number,
  },
  referralBonusBalance: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("money", moneySchema);
