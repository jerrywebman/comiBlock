// const multer = require("multer");
// //store in app
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });
// //check file type
// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// //upload if size >=5mb
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

var userPlan = require("../models/userPlan");

var functions = {
  //CREATE PLANS
  createUserPlan: function (req, res) {
    // if (
    //   !req.body.userPlanAmount ||
    //   !req.body.userPlanName ||
    //   !req.body.childName ||
    //   // !req.file.path||
    //   !req.body.childPhoto ||
    //   !req.user.email ||
    //   !req.user.username ||
    //   !req.user.accountType ||
    //   !req.body.childDOB ||
    //   !req.body.childClass ||
    //   !req.body.schoolName ||
    //   !req.body.schoolAddress ||
    //   !req.body.schoolState ||
    //   !req.body.schoolEmail ||
    //   !req.body.schoolPhoneNumber ||
    //   !req.body.schoolAccountName ||
    //   !req.body.schoolAccountNumber ||
    //   !req.body.schoolBankName
    // ) {
    //   res.json({ success: false, msg: "Enter all fields" });
    // } else {
    var newUserPlan = userPlan({
      userPlanAmount: req.body.userPlanAmount,
      userPlanName: req.body.userPlanName,
      userEmail: req.user.email,
      userUsername: req.user.username,
      userAccountType: req.user.accountType,
      childName: req.body.childName,
      childPhoto: req.body.childPhoto,
      // childPhoto: req.file.path,
      childDOB: req.body.childDOB,
      childClass: req.body.childClass,
      schoolName: req.body.schoolName,
      schoolState: req.body.schoolState,
      schoolEmail: req.body.schoolEmail,
      schoolPhoneNumber: req.body.schoolPhoneNumber,
      schoolAccountName: req.body.schoolAccountName,
      schoolAccountNumber: req.body.schoolAccountNumber,
      schoolBankName: req.body.schoolBankName,
    });
    newUserPlan.save(function (err, newPlan) {
      if (err) {
        res.json({ success: false, msg: "Failed to save" });
      } else {
        res.json({ success: true, msg: "successfully saved" });
      }
    });
    // }
  },

  //DELETE PLAN
  deleteUserPlan: async function (req, res) {
    try {
      const removedUserPlan = await userPlan.remove({ _id: req.params.id });
      res.json({ success: true, Message: "Plan Deleted" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE USER PLAN
  getSingleUserPlan: async function (req, res) {
    try {
      const singleUserPlan = await Plan.findById({
        _id: req.params.id,
      });
      res.json(singleUserPlan);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //UPDATE USER PLAN
  updateUserPlan: async function (req, res) {
    try {
      const updatedUserPlan = await userPlan.updateOne(
        { _id: req.params.id },
        {
          $set: {
            userPlanAmount: req.body.userPlanAmount,
            userPlanName: req.body.userPlanName,
            userEmail: req.user.email,
            userUsername: req.user.username,
            userAccountType: req.user.accountType,
            childName: req.body.childName,
            childPhoto: req.body.childPhoto,
            childDOB: req.body.childDOB,
            childClass: req.body.childClass,
            schoolName: req.body.schoolName,
            schoolState: req.body.schoolState,
            schoolEmail: req.body.schoolEmail,
            schoolPhoneNumber: req.body.schoolPhoneNumber,
            schoolAccountName: req.body.schoolAccountName,
            schoolAccountNumber: req.body.schoolAccountNumber,
            schoolBankName: req.body.schoolBankName,
          },
        }
      );
      res.json({ success: true, Message: "User Plan Successfully updated" });
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET ALL USER PLANS
  getAllUserPlan: async function (req, res) {
    try {
      const userplans = await userPlan.find({ userEmail: req.user.email });
      res.json(userplans);
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
