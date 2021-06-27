var Withdrawal = require("../models/Withdrawal");
var Money = require("../models/money");

var functions = {
  //CREATE Withdrawal
  createWithdrawal: async function (req, res) {
    //make sure all feilds are not empty
    //check the balance of the user
    //store the balance

    let balance = await Money.findOne({ userEmail: req.user.email });

    const minus = Number(req.body.amount);
    const moneyBalance = Number(balance.nairaBalance);
    if (
      !req.user.fullname ||
      !req.user.email ||
      !req.body.amount ||
      !req.user.username
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else if (minus > moneyBalance) {
      //if balance is greater than the withdrawal request approve
      res.json({ success: false, msg: "Insufficient Balance" });
    } else {
      var newWithdrawal = Withdrawal({
        userFullName: req.user.fullname,
        userEmail: req.user.email,
        amount: minus,
        userUsername: req.user.username,
        status: "Pending",
      });
      newWithdrawal.save(function (err, newWithdrawal) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create withdrawal request",
          });
        } else {
          const withdrawalCall = async () => {
            try {
              const withdrawalRequest = await Money.updateOne(
                { _id: req.user.email },
                {
                  $inc: {
                    nairaBalance: -minus,
                  },
                }
              );
              res.json({
                success: true,
                Message: "Withdrawal Successfully created",
              });
            } catch (err) {
              res.json({ message: err });
            }
          };
          withdrawalCall();
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
