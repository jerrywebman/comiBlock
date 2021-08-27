var Money = require("../models/money");
var Transaction = require("../models/Transaction");

var functions = {
  //update naira balance credit
  addToUserBalance: async function (req, res) {
    try {
      const value = Number(req.body.amount);
      const updatedUserMoney = await Money.findOneAndUpdate(
        { userEmail: req.body.email },
        {
          $inc: {
            investmentBalance: +value,
          },
          $set: {
            lastUpdated: Date.now,
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
        userEmail: req.body.email,
        transactionAmount: value,
        transactionType: "Deposit",
      });
      newTransaction.save(function () {});
    } catch (err) {
      res.json({ message: err });
    }
  },

  //update naira balance debit
  minusFromUserBalance: async function (req, res) {
    try {
      const value = Number(req.body.amount);
      const updatedUserMoney = await Money.findOneAndUpdate(
        { userEmail: req.body.email },
        {
          $inc: {
            investmentBalance: -value,
          },
          $set: {
            lastUpdated: Date.now,
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
        userEmail: req.body.email,
        transactionAmount: value,
        transactionType: "Withdrawal",
      });
      newTransaction.save(function () {});
    } catch (err) {
      res.json({ message: err });
    }
  },

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
