var Questionnaire = require("../models/Questionnaire");
var User = require("../models/user");

var functions = {
  //CREATE A NEW Questionnaire
  createQuestionaireResponse: function (req, res) {
    const userEmailAddres = req.user.email;
    if (!req.user.email) {
      res.json({
        success: false,
        msg: "User must be logged in to hit this endpoint",
      });
    } else {
      var newQuestionnaireRequest = Questionnaire({
        userEmail: req.user.email,
        userFullname: req.user.fullname,
        assessments: [
          {
            question: req.body.assessmentOneQ,
            answer: req.body.assessmentOneA,
          },
          {
            question: req.body.assessmentTwoQ,
            answer: req.body.assessmentTwoA,
          },
          {
            question: req.body.assessmentThreeQ,
            answer: req.body.assessmentThreeA,
          },
          {
            question: req.body.assessmentFourQ,
            answer: req.body.assessmentFourA,
          },
          {
            question: req.body.riskOneQ,
            answer: req.body.riskOneA,
          },
          {
            question: req.body.riskTwoQ,
            answer: req.body.riskTwoA,
          },
          {
            question: req.body.riskThreeQ,
            answer: req.body.riskThreeA,
          },
          {
            question: req.body.riskFourQ,
            answer: req.body.riskFourA,
          },
        ],
      });
      newQuestionnaireRequest.save(function (err, Questionnaire) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create Questionnaire Data",
          });
        } else {
          try {
            const updatedState = User.updateOne(
              { email: userEmailAddress },
              {
                $set: {
                  assessmentResponse: true,
                },
              }
            ).then(() => {
              res.json({
                success: true,
                msg: "successfully created Questionnaire Data",
              });
            });
          } catch (err) {
            res.json({ message: err });
          }
          //update the questionnaire state in the user profile
        }
      });
    }
  },

  // GET ALL DonationRequest
  getAllAssessmenResult: async function (req, res) {
    try {
      const allQuestionnaireRequest = await Questionnaire.find();
      res.json(allQuestionnaireRequest);
    } catch (err) {
      res.json({ message: err });
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
};

module.exports = functions;
