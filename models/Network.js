var mongoose = require("mongoose");
var schema = mongoose.Schema;

var networkSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  parent: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Network", networkSchema);
