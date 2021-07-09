var SponsorshipRequest = require("../models/SponsorshipRequest");

var functions = {
  //CREATE A NEW SponsorshipRequest
  createSponsorshipRequest: function (req, res) {
    if (!req.body.message) {
      res.json({ success: false, msg: "Enter sponsorship message" });
    } else {
      var newSponsorshipRequest = SponsorshipRequest({
        message: req.body.message,
        childFullname: req.body.childFullname,
        childReferralCode: req.body.childReferralCode,
      });
      newSponsorshipRequest.save(function (err, SponsorshipRequest) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create Sponsorship Request",
          });
        } else {
          res.json({
            success: true,
            msg: "successfully created Sponsorship Request",
          });
        }
      });
    }
  },

  //DELETE a SponsorshipRequest
  deleteSponsorshipRequest: async function (req, res) {
    try {
      const removeSponsorshipRequest = await SponsorshipRequest.remove({
        _id: req.params.id,
      });
      res.json({ success: true, Message: "Sponsorship Request Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SponsorshipRequest
  getSingleSponsorshipRequest: async function (req, res) {
    try {
      const singleSponsorshipRequest = await SponsorshipRequest.findById({
        _id: req.params.id,
      });
      res.json(singleSponsorshipRequest);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //UPDATE SponsorshipRequest
  updateSponsorshipRequest: async function (req, res) {
    try {
      const updatedSponsorshipRequest = await SponsorshipRequest.updateOne(
        { _id: req.params.id },
        {
          $set: {
            message: req.body.message,
            status: req.body.status,
            childFullname: req.body.childFullname,
            childReferralCode: req.body.childReferralCode,
          },
        }
      );
      res.json({
        success: true,
        Message: "Sponsorship Request Successfully updated",
      });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET ALL SponsorshipRequest
  getAllSponsorshipRequest: async function (req, res) {
    try {
      const allSponsorshipRequest = await SponsorshipRequest.find();
      res.json(allSponsorshipRequest);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
