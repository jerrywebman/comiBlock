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
  dateRequested: {
    type: String,
    require: true,
  },
  dateProcessed: {
    type: Date,
    default: Date.now,
  },
  accountName: {
    type: String,
    require: true,
  },
  accountNumber: {
    type: String,
    require: true,
  },

  transactionType: {
    type: String,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
