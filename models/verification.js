var mongoose = require("mongoose");
var schema = mongoose.Schema;

var verificationSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
    match: /.+\@.+\..+/,
    unique: true,
  },

  userFirstname: {
    type: String,
    require: true,
  },
  userSurname: {
    type: String,
    require: true,
  },
  selfieUrl: {
    type: String,
    require: true,
  },
  govtIdUrl: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("verification", verificationSchema);
