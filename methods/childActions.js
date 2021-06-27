var Child = require("../models/Child");

var functions = {
  createChild: function (req, res) {
    if (
      !req.body.childName ||
      !req.body.childPhoto ||
      !req.body.childDOB ||
      !req.body.schoolName ||
      !req.body.schoolAddress ||
      !req.body.schoolPhone ||
      !req.body.schoolEmail ||
      !req.body.schoolBankName ||
      !req.body.schoolAccountName ||
      !req.body.schoolAccountNumber ||
      !req.user.email
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newChild = Child({
        parentEmail: req.user.email,
        parentUsername: req.user.username,
        parentAccountType: req.user.accountType,
        referralCode: req.body.referralCode,
        childName: req.body.childName,
        childPhoto: req.body.childPhoto,
        childDOB: req.body.childDOB,
        childClass: req.body.childClass,
        childFaculty: req.body.childFaculty,
        childDepartment: req.body.childDepartment,
        childClass: req.body.childClass,
        schoolName: req.body.schoolName,
        schoolAddress: req.body.schoolAddress,
        schoolPhone: req.body.schoolPhone,
        schoolEmail: req.body.schoolEmail,
        schoolBankName: req.body.schoolBankName,
        schoolAccountName: req.body.schoolAccountName,
        schoolAccountNumber: req.body.schoolAccountNumber,
      });
      newSchool.save(function (err, newSchool) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully created student" });
        }
      });
    }
  },

  //GET ALL Child
  getAllChild: async function (req, res) {
    try {
      const allChild = await Child.find({ parentEmail: req.user.email });
      res.json(allChild);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE CHILD
  getSingleChild: async function (req, res) {
    try {
      const singleChild = await Child.find({ _id: req.params.id });
      res.json(singleChild);
    } catch (err) {
      res.json({ message: err });
    }
  },

  updateChild: async function (req, res) {
    try {
      const updatedSchool = await School.updateOne(
        { _id: req.params.id },
        {
          $set: {
            parentEmail: req.user.email,
            parentUsername: req.user.username,
            parentAccountType: req.user.accountType,
            referralCode: req.body.referralCode,
            childName: req.body.childName,
            childPhoto: req.body.childPhoto,
            childDOB: req.body.childDOB,
            childClass: req.body.childClass,
            childFaculty: req.body.childFaculty,
            childDepartment: req.body.childDepartment,
            childClass: req.body.childClass,
            schoolName: req.body.schoolName,
            schoolAddress: req.body.schoolAddress,
            schoolPhone: req.body.schoolPhone,
            schoolEmail: req.body.schoolEmail,
            schoolBankName: req.body.schoolBankName,
            schoolAccountName: req.body.schoolAccountName,
            schoolAccountNumber: req.body.schoolAccountNumber,
          },
        }
      );
      res.json({
        success: true,
        Message: "Child Details Successfully updated",
      });
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
