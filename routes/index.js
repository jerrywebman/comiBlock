const express = require("express");
require("dotenv").config();
const actions = require("../methods/actions");
const planactions = require("../methods/planActions");
const userplanactions = require("../methods/userPlanActions");
const notificationactions = require("../methods/notificationActions");
const networkactions = require("../methods/networkActions");
const childactions = require("../methods/childActions");
const moneyactions = require("../methods/userMoneyActions");
const withdrawalactions = require("../methods/withdrawalActions");
const sponsorshiprequestactions = require("../methods/sponsorshipRequestAction");
const donationrequestactions = require("../methods/donationRequestAction");
const adminactions = require("../methods/adminActions");

const verify = require("../verifyToken");

const router = express.Router();

router.get("/dashboard", function (req, res) {
  res.send("Hello Bro, this is a demo dashboard");
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
router.post("/api/signup", actions.addNew);

//authenticate a user
router.post("/api/login", actions.authenticate);

//@desc Get info of a user
router.get("/api/getinfo", actions.getinfo);

//UPDATE USER PROFILE
//edit profile
router.patch("/api/update/profile", verify, actions.updateProfile);

//edit profile
router.patch("/api/update/password", verify, actions.updatePassword);

// ------------------------
//CREATE A USER PLAN
// -------------------------
//@desc POST a Plan
router.post("/api/create/userplan", verify, userplanactions.createUserPlan);
//@desc DELETE a Plan
router.delete("/api/userplan/:id", verify, userplanactions.deleteUserPlan);
//@desc PATCH
//edit a plan
router.patch("/api/userplan/:id", verify, userplanactions.updateUserPlan);

//get a plan
router.get("/api/userplan/:id", verify, userplanactions.getSingleUserPlan);

//@desc GET
//get all  plan
router.get("/api/userplan/", verify, userplanactions.getAllUserPlan);

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

//CHILD
//@desc POST a Child
router.post("/api/create/child", verify, childactions.createChild);

//@desc GET all Child
router.get("/api/child", verify, childactions.getAllChild);

// get a Child
router.get("/api/child/:id", verify, childactions.getSingleChild);

// update a Child
router.patch("/api/child/:id", verify, childactions.updateChild);

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

// create a withdrawal order
router.post(
  "/api/user/pending/withdrawal",
  verify,
  withdrawalactions.createWithdrawal
);

// get a user withdrawal order
router.get(
  "/api/user/pending/withdrawal",
  verify,
  withdrawalactions.getWithdrawal
);

// CREATE Network/ORGANOGRAM
// @desc POST
router.post("/api/create/network", networkactions.createNetwork);

//@desc GET
//fix. add user
router.get("/api/network/:fullname", networkactions.getSpecificNetwork);
router.get("/api/networktwo/:fullname", networkactions.getSpecificNetworkTwo);

//CREATE SPONSORSHIP REQUEST
//@desc POst a sponsorship request
router.post(
  "/api/create/sponsorship",
  verify,
  sponsorshiprequestactions.createSponsorshipRequest
);
//delete a sponsorship request
router.delete(
  "/api/sponsorship/:id",
  verify,
  sponsorshiprequestactions.deleteSponsorshipRequest
);
//update a sponsorship request
router.patch(
  "/api/sponsorship/:id",
  verify,
  sponsorshiprequestactions.updateSponsorshipRequest
);

//get a sponsorship request
router.get(
  "/api/sponsorship/:id",
  verify,
  sponsorshiprequestactions.getSingleSponsorshipRequest
);

//get all  sponsorship request
router.get(
  "/api/sponsorship",
  verify,
  sponsorshiprequestactions.getAllSponsorshipRequest
);

//CREATE DONATION REQUEST
//@desc POst a donation request
router.post(
  "/api/create/donation",
  verify,
  donationrequestactions.createDonationRequest
);
//delete a donation request
router.delete(
  "/api/donation/:id",
  verify,
  donationrequestactions.deleteDonationRequest
);
//update a donation request
router.patch(
  "/api/donation/:id",
  verify,
  donationrequestactions.updateDonationRequest
);

//get a donation request
router.get(
  "/api/donation/:id",
  verify,
  donationrequestactions.getSingleDonationRequest
);

//get all  donation request
router.get(
  "/api/donation",
  verify,
  donationrequestactions.getAllDonationRequest
);

// //@desc GET
// //fix. add user
// router.get("/api/sponsorship/:id", sponsorshipactions.getSpecificSponsorship);

//ADMIN FUNCTIONS
//get all user
router.get("/api/get/alluser", adminactions.getAllUser);

//get a single user
router.get("/api/get/user", adminactions.getAUser);

//get all withdrawal
router.get("/api/get/allwithdrawal", adminactions.getAllWithdrawal);

//accept a withdrawal
router.get("/api/approve/withdrawal/:id", adminactions.approveWithdrawal);

module.exports = router;
