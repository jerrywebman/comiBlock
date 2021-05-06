const express = require("express");
require("dotenv").config();
const actions = require("../methods/actions");
const planactions = require("../methods/planActions");
const notificationactions = require("../methods/notificationActions");
const sponsorshipactions = require("../methods/sponsorshipActions");
const schoolactions = require("../methods/schoolActions");
const moneyactions = require("../methods/userMoneyActions");

const verify = require("../verifyToken");

const router = express.Router();

router.get("/dashboard", function (req, res) {
  res.send("Hello Bro, this is a demo dashboard");
});

router.get("/", function (req, res) {
  res.send("Hello Bro, Welcome home");
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
router.post("/api/signup", actions.addNew);

//authenticate a user
router.post("/api/login", actions.authenticate);

//@desc Get info of a user
router.get("/api/getinfo", actions.getinfo);

//CREATE A PLAN
//@desc POST a Plan
router.post("/api/create/plan", verify, planactions.createPlan);

//@desc DELETE
//delete a plan
router.delete("/api/plan/:id", verify, planactions.deletePlan);

//@desc PATCH
//edit a plan
router.patch("/api/plan/:id", verify, planactions.updatePlan);

//@desc PATCH
//get a plan
router.get("/api/plan/:id", verify, planactions.getSinglePlan);

//@desc GET
//get all  plan
router.get("/api/plan/", verify, planactions.getAllPlan);

//NOTIFICATION
//@desc POST a Notification
router.post(
  "/api/create/notification",
  verify,
  notificationactions.createNotification
);

//delete a Notification
router.delete(
  "/api/notification/:id",
  verify,
  notificationactions.deleteNotification
);

//update a Notification
router.patch(
  "/api/notification/:id",
  verify,
  notificationactions.updateNotification
);

//get a Notification
router.get(
  "/api/notification/:id",
  verify,
  notificationactions.getSingleNotification
);

//get all  Notification
router.get(
  "/api/notification/",
  verify,
  notificationactions.getAllNotification
);

//SCHOOL
//@desc POST a School
router.post("/api/create/school", verify, schoolactions.createSchool);

//@desc GET all School
router.get("/api/school", verify, schoolactions.getAllSchool);

// update a School
router.patch("/api/school/:id", verify, schoolactions.updateSchool);

//get a user Schools
router.get("/api/school/user", verify, schoolactions.getSingleSchool);

//USER MONEY
// credit a User Naira Balance
router.patch(
  "/api/user/account/addnaira",
  verify,
  moneyactions.addNairaBalance
);

// credit a User Naira Balance
router.patch(
  "/api/user/account/minusnaira",
  verify,
  moneyactions.minusNairaBalance
);

// update a User Referral Balance
router.patch(
  "/api/user/account/referral",
  verify,
  moneyactions.updateReferralBalance
);

// get a User Balance
router.get("/api/user/account/balance", verify, moneyactions.getUserBalance);

//CREATE SPONSORSHIP/ORGANOGRAM
//@desc POST
router.post("/api/create/sponsorship", sponsorshipactions.createSponsorship);

//@desc GET
//fix. add user
router.get("/api/sponsorship/:id", sponsorshipactions.getSpecificSponsorship);

module.exports = router;
