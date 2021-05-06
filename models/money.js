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
  userFullname: {
    type: String,
    require: true,
  },
  nairaBalance: {
    type: Number,
  },
  referralBonusBalance: {
    type: Number,
  },
});

module.exports = mongoose.model("money", moneySchema);
