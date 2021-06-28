var User = require("../models/user");
var Withdrawal = require("../models/Withdrawal");
var Transaction = require("../models/Transaction");

const { token } = require("morgan");

var functions = {
  //GET A USER
  getAllUser: async function (req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.json({ message: err });
    }
  },
  //GET A SINGLE USER
  getAUser: async function (req, res) {
    try {
      const user = await User.find({ email: req.body.email });
      res.json(user);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET USERS WITHDRAWAL ORDER
  getAllWithdrawal: async function (req, res) {
    try {
      const withdrawals = await Withdrawal.find({});
      res.json(withdrawals);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //APPROVE A WITHDRAWAL ORDER
  approveWithdrawal: async function (req, res) {
    //get the transaction
    const order = await Withdrawal.find({ _id: req.params.id });
    //post transaction
    var newTransaction = Transaction({
      userEmail: order.userEmail,
      userFullname: order.userFullName,
      transactionAmount: order.amount,
      dateRequested: order.createdAt,
      accountName: req.body.schoolAccountName,
      accountNumber: req.body.schoolAccountNumber,
      transactionType: "Withdrawal",
    });
    newTransaction.save(function (err, newSchool) {
      if (err) {
        res.json({ success: false, msg: "Failed to save" });
      } else {
        res.json({ success: true, msg: "successfully saved" });
      }
    });
    try {
      const withdrawalOrder = await Withdrawal.delete({ _id: req.params.id });
      res.json({ success: false, msg: "Withdrawal Order Approved" });
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
