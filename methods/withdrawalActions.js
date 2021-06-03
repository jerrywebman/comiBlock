var Withdrawal = require("../models/Withdrawal");

var functions = {
  //CREATE Withdrawal
  createWithdrawal: function (req, res) {
    if (
      !req.user.userFullName ||
      !req.user.userEmail ||
      !req.body.amount ||
      !req.user.userUsername
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newWithdrawal = Withdrawal({
        userFullName: req.user.userFullName,
        userEmail: req.user.userEmail,
        amount: req.body.amount,
        userUsername: req.user.userUsername,
        status: "Pending",
      });
      newWithdrawal.save(function (err, newWithdrawal) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },

  //GET A USER WITHDRAWAL ORDER
  getWithdrawal: async function (req, res) {
    try {
      const withdrawals = await Withdrawal.find({
        userEmail: req.user.email,
      });
      res.json(withdrawals);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE PLAN
  // getSinglePlan: async function (req, res) {
  //   try {
  //     const singlePlan = await Plan.findById({ _id: req.params.id });
  //     res.json(singlePlan);
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },

  //UPDATE PLAN
  // updatePlan: async function (req, res) {
  //   try {
  //     const updatedPlan = await Plan.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           planName: req.body.planName,
  //           planPrice: req.body.planPrice,
  //           planCatchPhrase: req.body.planCatchPhrase,
  //           planBenefitOne: req.body.planBenefitOne,
  //           planBenefitTwo: req.body.planBenefitTwo,
  //           planBenefitThree: req.body.planBenefitThree,
  //           planLevels: req.body.planLevels,
  //           planDownlines: req.body.planDownlines,
  //           systemCharge: req.body.systemCharge,
  //           affiliateCharge: req.body.affiliateCharge,
  //           marketerCharge: req.body.marketerCharge,
  //         },
  //       }
  //     );
  //     res.json({ success: true, Message: "Plan Successfully updated" });
  //   } catch (err) {
  //     res.json({ message: err });
  //   }
  // },

  //GET ALL PLANS
  //   getAllPlan: async function (req, res) {
  //     try {
  //       const plans = await Plan.find();
  //       res.json(plans);
  //     } catch (err) {
  //       res.json({ message: err });
  //     }
  //   },
};

module.exports = functions;
