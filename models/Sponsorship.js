var mongoose = require("mongoose");
var schema = mongoose.Schema;

var sponsorshipSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  parent: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Sponsorship", sponsorshipSchema);
