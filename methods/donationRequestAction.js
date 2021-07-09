var DonationRequest = require("../models/DonationRequest");

var functions = {
  //CREATE A NEW DonationRequest
  createDonationRequest: function (req, res) {
    if (!req.body.amount) {
      res.json({ success: false, msg: "Enter Donation Amount" });
    } else {
      var newSponsorshipRequest = DonationRequest({
        amount: req.body.amount,
        childFullname: req.body.childFullname,
        childReferralCode: req.body.childReferralCode,
      });
      newDonationRequest.save(function (err, DonationRequest) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create Donation Request",
          });
        } else {
          res.json({
            success: true,
            msg: "successfully created Donation Request",
          });
        }
      });
    }
  },

  //DELETE a DonationRequest
  deleteDonationRequest: async function (req, res) {
    try {
      const removedDonationRequest = await DonationRequest.remove({
        _id: req.params.id,
      });
      res.json({ success: true, Message: "Donation Request Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A DonationRequest
  getSingleDonationRequest: async function (req, res) {
    try {
      const singleDonationRequest = await DonationRequest.findById({
        _id: req.params.id,
      });
      res.json(singleDonationRequest);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //UPDATE DonationRequest
  updateDonationRequest: async function (req, res) {
    try {
      const updatedDonationRequest = await DonationRequest.updateOne(
        { _id: req.params.id },
        {
          $set: {
            amount: req.body.amount,
            status: req.body.status,
            childFullname: req.body.childFullname,
            childReferralCode: req.body.childReferralCode,
          },
        }
      );
      res.json({
        success: true,
        Message: "Donation Request Successfully updated",
      });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET ALL DonationRequest
  getAllDonationRequest: async function (req, res) {
    try {
      const allDonationRequest = await DonationRequest.find();
      res.json(allDonationRequest);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
