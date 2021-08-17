var User = require("../models/user");
var Money = require("../models/money");
var jwt = require("jwt-simple");
var config = require("../config/dbconfig");
const { token } = require("morgan");
var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

var functions = {
  signup: async function (req, res) {
    // Function to generate OTP
    function generateOTP() {
      // Declare a digits variable
      // which stores all digits
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const generatedOTP = generateOTP();

    let userEmail = await User.findOne({ email: req.body.email });
    let userphone = await User.findOne({ phone: req.body.phone });
    if (
      !req.body.phone ||
      !req.body.firstname ||
      !req.body.surname ||
      !req.body.email ||
      !req.body.occupation ||
      !req.body.dateOfBirth ||
      !req.body.password
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else if (userEmail) {
      return res.status(400).send({
        success: false,
        msg: "a user with this email address already exists!",
      });
    } else if (userphone) {
      return res.status(400).send({
        success: false,
        msg: "a user with this Phone number already exists!",
      });
    } else {
      //CREATING A NEW USER Money
      try {
        const newMoney = {
          _id: req.body.email,
          userEmail: req.body.email,
          userFirstname: req.body.firstname,
          userSurname: req.body.surname,
          occupation: req.body.occupation,
          nairaBalance: 0,
          referralBonusBalance: 0,
        };
        await new Money(newMoney).save();
      } catch (err) {
        console.log(err);
      }
      //CREATING A NEW USER
      var newUser = User({
        firstname: req.body.firstname,
        surname: req.body.surname,
        phone: req.body.phone,
        occupation: req.body.occupation,
        dateOfBirth: req.body.dateOfBirth,
        verifyCode: Number(generatedOTP),
        email: req.body.email,
        password: req.body.password,
      });
      newUser.save(function (err, newUser) {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to create user account",
            err,
          });
        } else {
          //send an email here
          //step 1
          //ALLOW LESS SECURE APPS TO MAKE THIS WORK
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASSWORD,
            },
          });

          //step 2
          let mailOptions = {
            from: "jaytest@gmail.com",
            to: req.body.email,
            subject: "Testing the email function",
            text: `Welcome Henry, The user is supposed to get this OTP on signup *** ${generatedOTP}***`,
          };

          //step3
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log("error occurs");
            } else {
              console.log("Email Sent");
            }
          });

          res.json({ success: true, msg: "User Account Successfully Created" });
        }
      });
    }
  },
  //RECOVER USER ACCOUNT
  recoverAccount: async function (req, res) {
    let userEmail = await User.findOne({ email: req.body.email });
    if (!req.body.email) {
      res.json({ success: false, msg: "Please Enter an Email address" });
    } else if (!userEmail) {
      return res.status(400).send({
        success: false,
        msg: "There is no user with this email address!",
      });
    } else {
      //updating the otp code area and send email to user
      // Function to generate OTP
      function generateOTP() {
        // Declare a digits variable
        // which stores all digits
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }
      const generatedOTP = generateOTP();
      //NOW I HAVE THE OTP, SEND IT TO THE DATABASE
      try {
        const updatedProfile = await User.updateOne(
          { email: req.body.email },
          {
            $set: {
              verifyCode: Number(generatedOTP),
            },
          }
        ).then(() => {
          //step 1
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASSWORD,
            },
          });
          //step 2
          let mailOptions = {
            from: "comiblock@gmail.com",
            to: req.body.email,
            subject: "OTP FROM COMIBLOCK",
            text: `you got this email because you are trying to recover your account. Please use this OTP -- ${generatedOTP} -- to create a new password`,
          };

          //step3
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log("error occurs");
            } else {
              console.log("Email Sent");
            }
          });
        });
        res.json({
          success: true,
          Message: "OTP successfully sent to users email",
        });
      } catch (err) {
        res.json({ message: err });
      }
    }
  },

  //CONFIRM EMAIL ADDRESS
  confirmEmail: async function (req, res) {
    let userEmail = await User.findOne({ email: req.body.email });
    const theEmail = req.body.email;
    if (!req.body.email) {
      res.json({ success: false, msg: "Please Enter an Email address" });
    } else if (!userEmail) {
      return res.status(400).send({
        success: false,
        msg: "There is no user with this email address!",
      });
    } else if (Number(userEmail.verifyCode) !== Number(req.body.verifyCode)) {
      return res.status(400).send({
        success: false,
        msg: "Wrong OTP Password",
      });
    } else {
      try {
        const updatedPassword = User.updateOne(
          { email: theEmail },
          {
            $set: {
              verified: true,
              verifyCode: 0,
            },
          }
        ).then(() => {
          res.json({ success: true, msg: "OTP is correct" });
        });
      } catch (err) {
        res.send({ message: err });
      }
    }
  },

  //CREATE NEW/UPDATE PASSWORD
  //update the user password when user is not signed in
  updatePassword: async function (req, res) {
    const userEmailAddress = req.body.email;
    User.findOne(
      {
        email: userEmailAddress,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "User does not exist",
          });
        } else if (user && req.body.confirmPassword === !req.body.newPassword) {
          res.status(400).send({
            success: false,
            msg: "Password did not match",
          });
        } else {
          //CHANGE THE PASSWORD
          try {
            bcrypt.genSalt(10, function (err, salt) {
              if (err) {
                return next(err);
              }
              bcrypt.hash(
                req.body.newPassword,
                salt,
                async function (err, hash) {
                  if (err) {
                    return next(err);
                  }
                  const updatedPassword = await User.updateOne(
                    { email: userEmailAddress },
                    {
                      $set: {
                        password: hash,
                        verified: true,
                      },
                    }
                  );
                }
              );
            });
            res.json({
              success: true,
              Message: "Password Successfully updated",
            });
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    );
  },

  //authenticate the user
  authenticate: function (req, res) {
    User.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "Authentication Failed, user email or password not correct",
          });
        } else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              //PASS THE USER TOKEN TO CHECK
              var token = jwt.encode(user, config.secret);
              res.json({ success: true, token: token });
            } else {
              return res.status(403).send({
                success: false,
                msg: "Authentication Failed, Wrong password",
              });
            }
          });
        }
      }
    );
  },

  getinfo: function (req, res) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      var token = req.headers.authorization.split(" ")[1];
      var decodedtoken = jwt.decode(token, config.secret);
      return res.json({
        id: decodedtoken._id,
        success: true,
        firstname: decodedtoken.firstname,
        surname: decodedtoken.surname,
        occupation: decodedtoken.occupation,
        phone: decodedtoken.phone,
        email: decodedtoken.email,
        verified: decodedtoken.verified,
        dateOfBirth: decodedtoken.dateOfBirth,
        dateJoined: decodedtoken.dateJoined,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "No User/Invalid Token" });
    }
  },
};

module.exports = functions;
