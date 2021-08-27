const express = require("express");
require("dotenv").config();
const actions = require("../methods/actions");
const transactionactions = require("../methods/transactionsActions");
const moneyactions = require("../methods/userMoneyActions");
const assessment = require("../methods/questionnaireResponseAction");
const portfolio = require("../methods/portfolioActions");

const verify = require("../verifyToken");

const router = express.Router();

router.get("/dashboard", function (req, res) {
  res.send("Welcome to Comic Blocks API");
});

router.get("/", function (req, res) {
  res.sendFile("views/test.html", { root: __dirname });
});

router.get("/api", function (req, res) {
  res.send("Hello Bro, Welcome to our Api Home");
});

//LOGOUT A USER
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//@desc add a new user
router.post("/api/signup", actions.signup);

//@desc recover user account
router.post("/api/recover_account", actions.recoverAccount);

//@desc confirm a new/old user email
router.post("/api/confirm_email", actions.confirmEmail);

//@desc confirm a new/old user email
router.post("/api/change_password", verify, actions.updatePassword);

//authenticate a user
router.post("/api/login", actions.authenticate);

//@desc Get info of a user
router.get("/api/getinfo", actions.getinfo);

//CREATE ASSESSMENT RESPONSE
//@desc POST
router.post(
  "/api/user/create/assessment",
  verify,
  assessment.createQuestionaireResponse
);

//GET
router.get(
  "/api/user/get/assessment",
  verify,
  assessment.getAllAssessmenResult
);

//CREATE PORTFOLIO
//@desc POST
router.post("/api/portfolio/create", portfolio.createPortfolio);
//get a donation request
router.get("/api/portfolio", portfolio.getAllPortfolio);
// //delete a donation request
router.delete("/api/portfolio/:id", portfolio.deletePortfolio);
// //update a donation request
router.get("/api/portfolio/:id", portfolio.getSinglePortfolio);

//USER MONEY
// credit a User Balance
router.post("/api/user/credit/balance", moneyactions.addToUserBalance);

// debit a User Balance
router.post("/api/user/debit/balance", moneyactions.minusFromUserBalance);

// get a User Balance
router.get("/api/user/balance", verify, moneyactions.getUserBalance);

//USER TRANSACTIONS

// get a User Transactions
router.get(
  "/api/user/transactions",
  verify,
  transactionactions.getAllUserTransaction
);
// get a User Deposit Transactions
router.get(
  "/api/user/transactions/deposit",
  verify,
  transactionactions.getAllUserDepositTransaction
);
// get a User withdrawal Transactions
router.get(
  "/api/user/transactions/withdrawal",
  verify,
  transactionactions.getAllUserWithdrawalTransaction
);

// CREATE Network/ORGANOGRAM
// @desc POST
// router.post("/api/create/network", networkactions.createNetwork);

//@desc GET
//fix. add user
// router.get("/api/network/:fullname", networkactions.getSpecificNetwork);
// router.get("/api/networktwo/:fullname", networkactions.getSpecificNetworkTwo);
//UPDATE USER PROFILE
//edit profile
// router.patch("/api/update/profile", verify, actions.updateProfile);

//edit profile
// router.patch("/api/update/password", verify, actions.updatePassword);

module.exports = router;
