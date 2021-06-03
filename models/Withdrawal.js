var mongoose = require("mongoose");
var schema = mongoose.Schema;

var withdrawalSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  userUsername: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
