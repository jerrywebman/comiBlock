var Questionnaire = require("../models/Questionnaire");

var functions = {
  //CREATE A NEW Questionnaire
  createQuestionaireResponse: function (req, res) {
    if (!req.user.email) {
      res.json({
        success: false,
        msg: "Please select login to hit this endpoint",
      });
    } else {
      var newQuestionnaireRequest = Questionnaire({
        userEmail: req.user.email,
        userFirstname: req.user.userFirstname,
        assessmentOne: {
          question: req.body.assessmentOneQ,
          answer: req.body.assessmentOneA,
        },
        assessmentTwo: {
          question: req.body.assessmentTwoQ,
          answer: req.body.assessmentTwoA,
        },
        assessmentThree: {
          question: req.body.assessmentThreeQ,
          answer: req.body.assessmentThreeA,
        },
        assessmentFour: {
          question: req.body.assessmentFourQ,
          answer: req.body.assessmentFourA,
        },
        riskOne: {
          question: req.body.riskOneQ,
          answer: req.body.riskOneA,
        },
        riskTwo: {
          question: req.body.riskTwoQ,
          answer: req.body.riskTwoA,
        },
        riskThree: {
          question: req.body.riskThreeQ,
          answer: req.body.riskThreeA,
        },
        riskFour: {
          question: req.body.riskFourQ,
          answer: req.body.riskFourA,
        },
      });
      newQuestionnaireRequest.save(function (err, Questionnaire) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create Questionnaire Data",
          });
        } else {
          res.json({
            success: true,
            msg: "successfully created Questionnaire Data",
          });
        }
      });
    }
  },

  // //DELETE a DonationRequest
  // deleteDonationRequest: async function (req, res) {
  //   try {
  //     const removedDonationRequest = await DonationRequest.remove({
  //       _id: req.params.id,
  //     });
  //     res.json({ success: true, Message: "Donation Request Deleted" });
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },

  //GET A DonationRequest
  // getSingleDonationRequest: async function (req, res) {
  //   try {
  //     const singleDonationRequest = await DonationRequest.findById({
  //       _id: req.params.id,
  //     });
  //     res.json(singleDonationRequest);
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },

  //UPDATE DonationRequest
  // updateDonationRequest: async function (req, res) {
  //   try {
  //     const updatedDonationRequest = await DonationRequest.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           amount: req.body.amount,
  //           status: req.body.status,
  //           childFullname: req.body.childFullname,
  //           childReferralCode: req.body.childReferralCode,
  //         },
  //       }
  //     );
  //     res.json({
  //       success: true,
  //       Message: "Donation Request Successfully updated",
  //     });
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },

  //GET ALL DonationRequest
  // getAllDonationRequest: async function (req, res) {
  //   try {
  //     const allDonationRequest = await DonationRequest.find();
  //     res.json(allDonationRequest);
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },
};

module.exports = functions;
