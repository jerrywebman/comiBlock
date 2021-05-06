var mongoose = require("mongoose");
var schema = mongoose.Schema;

var notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
