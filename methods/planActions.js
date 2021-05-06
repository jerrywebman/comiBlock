var Plan = require("../models/Plan");

var functions = {
  //CREATE PLANS
  createPlan: function (req, res) {
    if (
      !req.body.planName ||
      !req.body.planPrice ||
      !req.body.planCatchPhrase ||
      !req.body.planBenefitOne ||
      !req.body.planBenefitTwo ||
      !req.body.planBenefitThree ||
      !req.body.planLevels ||
      !req.body.planDownlines ||
      !req.body.systemCharge ||
      !req.body.affiliateCharge ||
      !req.body.marketerCharge
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newPlan = Plan({
        planName: req.body.planName,
        planPrice: req.body.planPrice,
        planCatchPhrase: req.body.planCatchPhrase,
        planBenefitOne: req.body.planBenefitOne,
        planBenefitTwo: req.body.planBenefitTwo,
        planBenefitThree: req.body.planBenefitThree,
        planLevels: req.body.planLevels,
        planDownlines: req.body.planDownlines,
        systemCharge: req.body.systemCharge,
        affiliateCharge: req.body.affiliateCharge,
        marketerCharge: req.body.marketerCharge,
      });
      newPlan.save(function (err, newPlan) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },

  //DELETE PLAN
  deletePlan: async function (req, res) {
    try {
      const removedPlan = await Plan.remove({ _id: req.params.id });
      res.json({ success: true, Message: "Plan Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE PLAN
  getSinglePlan: async function (req, res) {
    try {
      const singlePlan = await Plan.findById({ _id: req.params.id });
      res.json(singlePlan);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //UPDATE PLAN
  updatePlan: async function (req, res) {
    try {
      const updatedPlan = await Plan.updateOne(
        { _id: req.params.id },
        {
          $set: {
            planName: req.body.planName,
            planPrice: req.body.planPrice,
            planCatchPhrase: req.body.planCatchPhrase,
            planBenefitOne: req.body.planBenefitOne,
            planBenefitTwo: req.body.planBenefitTwo,
            planBenefitThree: req.body.planBenefitThree,
            planLevels: req.body.planLevels,
            planDownlines: req.body.planDownlines,
            systemCharge: req.body.systemCharge,
            affiliateCharge: req.body.affiliateCharge,
            marketerCharge: req.body.marketerCharge,
          },
        }
      );
      res.json({ success: true, Message: "Plan Successfully updated" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET ALL PLANS
  getAllPlan: async function (req, res) {
    try {
      const plans = await Plan.find();
      res.json(plans);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
