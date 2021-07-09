var mongoose = require("mongoose");
var schema = mongoose.Schema;

var passwordSchema = new mongoose.Schema({
  userFullname: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },

  userAccountType: {
    type: String,
    require: true,
  },
  reason: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("password", passwordSchema);
