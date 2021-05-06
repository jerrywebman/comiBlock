var mongoose = require("mongoose");
var schema = mongoose.Schema;

var transactionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  userFullname: {
    type: String,
    require: true,
  },
  transactionAmount: {
    type: Number,
  },
  transactionType: {
    type: String,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
