var mongoose = require("mongoose");
var schema = mongoose.Schema;

var donationRequestSchema = new mongoose.Schema({
  amount: {
    type: Number,
    require: true,
  },
  childReferralCode: {
    type: String,
    require: true,
  },
  childFullname: {
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

module.exports = mongoose.model("DonationRequest", donationRequestSchema);
