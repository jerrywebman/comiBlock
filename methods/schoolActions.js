var School = require("../models/School");

var functions = {
  createSchool: function (req, res) {
    // try {
    //   if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    //   ) {
    //     var token = req.headers.authorization.split(" ")[1];
    //     var decodedtoken = await jwt.decode(token, config.secret);
    //   }
    // } catch (err) {
    //   res.json({ success: false, msg: "No Token/Userx Found" });
    // }
    if (
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
      var newSchool = School({
        schoolName: req.body.schoolName,
        schoolAddress: req.body.schoolAddress,
        schoolPhone: req.body.schoolPhone,
        schoolEmail: req.body.schoolEmail,
        schoolBankName: req.body.schoolBankName,
        schoolAccountName: req.body.schoolAccountName,
        schoolAccountNumber: req.body.schoolAccountNumber,
        userEmail: req.user.email,
      });
      newSchool.save(function (err, newSchool) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "successfully saved" });
        }
      });
    }
  },
  //GET ALL SCHOOL
  getAllSchool: async function (req, res) {
    try {
      const school = await School.find();
      res.json(school);
    } catch (err) {
      res.json({ message: err });
    }
  },

  //GET A SINGLE SCHOOL
  getSingleSchool: async function (req, res) {
    try {
      const singleSchool = await School.find({
        userEmail: req.user.email,
      });
      res.json(singleSchool);
    } catch (err) {
      res.json({ message: err });
    }
  },

  updateSchool: async function (req, res) {
    try {
      const updatedSchool = await School.updateOne(
        { _id: req.params.id },
        {
          $set: {
            schoolName: req.body.schoolName,
            schoolAddress: req.body.schoolAddress,
            schoolPhone: req.body.schoolPhone,
            schoolEmail: req.body.schoolEmail,
            schoolBankName: req.body.schoolBankName,
            schoolAccountName: req.body.schoolAccountName,
            schoolAccountNumber: req.body.schoolAccountNumber,
            userEmail: req.body.userEmail,
          },
        }
      );
      res.json({ success: true, Message: "School Successfully updated" });
    } catch (err) {
      res.json({ message: err });
    }
  },
};

module.exports = functions;
