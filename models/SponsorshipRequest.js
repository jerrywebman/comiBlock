var mongoose = require("mongoose");
var schema = mongoose.Schema;

var sponsorshipRequestSchema = new mongoose.Schema({
  message: {
    type: String,
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

module.exports = mongoose.model("SponsorshipRequest", sponsorshipRequestSchema);
