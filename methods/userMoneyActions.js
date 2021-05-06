var Money = require("../models/money");
var Transaction = require("../models/Transaction");

var functions = {
  //update naira balance credit
  addNairaBalance: async function (req, res) {
    try {
      const value = Number(req.body.amount);
      const updatedUserMoney = await Money.findOneAndUpdate(
        { _id: req.user.email },
        {
          $inc: {
            nairaBalance: +value,
          },
        }
      );
      res.json({
        success: true,
        Message: "User Balance Successfully updated",
        value,
      });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //update naira balance debit
  minusNairaBalance: async function (req, res) {
    try {
      const value = Number(req.body.amount);
      const updatedUserMoney = await Money.findOneAndUpdate(
        { _id: req.user.email },
        {
          $inc: {
            nairaBalance: -value,
          },
        }
      );
      res.json({
        success: true,
        Message: "User Balance Successfully updated",
        value,
      });
      //create trxn data
      var newTransaction = Transaction({
        userEmail: req.user.email,
        userFullname: req.user.username,
        transactionAmount: value,
        transactionType: "Withdrawal",
      });
      newTransaction.save(function () {});
    } catch (err) {
      res.json({ message: err });
    }
  },

  updateReferralBalance: function (req, res) {},
  getUserBalance: async function (req, res) {
    try {
      const singleUserBalance = await Money.find({
        userEmail: req.user.email,
      });
      res.json(singleUserBalance);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
