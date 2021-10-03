var User = require("../models/user");
var Money = require("../models/money");
var jwt = require("jwt-simple");
var config = require("../config/dbconfig");
const { token } = require("morgan");
var bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const emailjs = require("emailjs-com");

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
    const defaultEmail = req.body.email;
    const lowerCaseEmail = defaultEmail.toLowerCase();

    let userEmail = await User.findOne({ email: lowerCaseEmail });
    let userphone = await User.findOne({ phone: req.body.phone });
    let userPassword = req.body.password;
    if (
      !req.body.phone ||
      !req.body.fullname ||
      !lowerCaseEmail ||
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
    } else if (userPassword < 6) {
      return res.status(400).send({
        success: false,
        msg: "Password must be 6 or more character long",
      });
    } else {
      //CREATING A NEW USER Money
      try {
        const newMoney = {
          _id: lowerCaseEmail,
          userEmail: lowerCaseEmail,
          userFullname: req.body.firstname,
          occupation: req.body.occupation,
          investmentBalance: 0,
          referralBonusBalance: 0,
        };
        await new Money(newMoney).save();
      } catch (err) {
        console.log(err);
      }
      //CREATING A NEW USER
      var newUser = User({
        fullname: req.body.fullname,
        phone: req.body.phone,
        occupation: req.body.occupation,
        street: "",
        city: "",
        country: "",
        dateOfBirth: req.body.dateOfBirth,
        verifyCode: Number(generatedOTP),
        email: lowerCaseEmail,
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
          const logoUrl = "https://i.imgur.com/uNnD4YG.png";
          let htmlWelcomeTemplate = `
              <!DOCTYPE html>
              <html>
              <body>
              <img src=${logoUrl} alt="ComiBlock Logo" style="display:block;width:150px;height:100px;margin-left:auto; margin-right:auto">
              <h3 style="margin:.4em; text-align:center; color:black">Welcome to ComiBlock</h3>
              
              <p style="line-spacing:4px; text-allign:left;color:black">Hello ${req.body.fullname},</p>
              <p style="line-spacing:4px; text-allign:left;color:black">Please use this verification code to complete your registration.</p>
              <p style="font-weight:bold; text-allign:left;color:black;font-size:1.5em;margin-bottom:2em">${generatedOTP}</p>
              <p style="font-size:2px;line-spacing:4px; text-allign:left; margin-top:2em;color:black">Powerful investment strategies that help you invest in crypto confidently, grow and manage your capital expertly, available on <span><a href="https://play.google.com/store/apps/details?id=com.sendVillageHQ.comi_block">Andriod</a></span>, and coming soon on IOS.</p>
              </body>
              </html>
             `;
          //send an email here
          //step 1
          //ALLOW LESS SECURE APPS TO MAKE THIS WORK FOR GMAIL
          let transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            secure: true,
            port: 465,
            auth: {
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASSWORD,
            },
          });

          //step 2
          let mailOptions = {
            from: "support@comiblock.com",
            to: lowerCaseEmail,
            subject: "Thank you for joining ComiBlock",
            text: htmlWelcomeTemplate,
          };

          //step3
          transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
              console.log(err);
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
    const defaultEmail = req.body.email;
    const lowerCaseEmail = defaultEmail.toLowerCase();

    let userEmail = await User.findOne({ email: lowerCaseEmail });
    if (!lowerCaseEmail) {
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
      const logoUrl = "https://i.imgur.com/uNnD4YG.png";
      let htmlRecoverTemplate = `
        <!DOCTYPE html>
        <html>
        <body>
         <img src=${logoUrl} alt="ComiBlock Logo" style="display:block;width:150px;height:100px;margin-left:auto; margin-right:auto">
        <h3 style="margin:.4em; margin-bottom:2em; text-align:center; color:black">Please confirm your email</h3>
        
        <p style="line-spacing:4px; text-allign:left;color:black">Hello ${userEmail.fullname},</p>
        <p style="line-spacing:4px; text-allign:left;color:black">Please use this verification code to verify your email address.</p>
        <p style="font-weight:bold; text-allign:left;color:black;font-size:1.5em;margin-bottom:2em">${generatedOTP}</p>
        <p style="font-size:3px;line-spacing:4px; text-allign:left;color:black;margin-bottom:3em"><span style="font-weight:bold">Note:</span> If you did not take this action, please contact us immediately at <span><a href="mailto:hello@comiblock.com">hello@comiblock.com</a></span>.</p>
        <p style="font-size:2px;line-spacing:4px; text-allign:left; margin-top:2em;color:black">Powerful investment strategies that help you invest in crypto confidently, grow and manage your capital expertly, available on <span><a href="https://play.google.com/store/apps/details?id=com.sendVillageHQ.comi_block">Andriod</a></span>, and coming soon on IOS</p>
        </body>
        </html>
`;
      try {
        const updatedProfile = await User.updateOne(
          { email: lowerCaseEmail },
          {
            $set: {
              verifyCode: Number(generatedOTP),
            },
          }
        ).then(() => {
          //step 1
          let transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            secure: true,
            port: 465,
            auth: {
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.NODEMAILER_PASSWORD,
            },
          });

          //step 2
          let mailOptions = {
            from: "support@comiblock.com",
            to: lowerCaseEmail,
            subject: "OTP Notification - ComiBlock",
            html: htmlRecoverTemplate,
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
    const defaultEmail = req.body.email;
    const lowerCaseEmail = defaultEmail.toLowerCase();

    let userEmail = await User.findOne({ email: lowerCaseEmail });
    const theEmail = lowerCaseEmail;
    if (!lowerCaseEmail) {
      res.json({ success: false, msg: "Please Enter an Email address" });
    } else if (!userEmail) {
      return res.status(400).send({
        success: false,
        msg: "There is no user with this email address!",
      });
    } else if (Number(userEmail.verifyCode) !== Number(req.body.verifyCode)) {
      return res.status(400).send({
        success: false,
        msg: "Wrong OTP",
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
  //update the user password when user is signed in
  updatePasswordAuth: async function (req, res) {
    const userEmailAddress = req.user.email;
    let passConfirmString = req.body.confirmPassword;
    let passConfirmNewString = req.body.newPassword;

    User.findOne(
      {
        email: userEmailAddress,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "Please sign in to change your password",
          });
        } else if (user && req.body.confirmPassword !== req.body.newPassword) {
          res.status(400).send({
            success: false,
            msg: "Password did not match",
          });
        } else if (
          passConfirmString.length < 6 &&
          passConfirmNewString.length < 6
        ) {
          res.status(400).send({
            success: false,
            msg: "Password not secure. it must be 6 characters or more",
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

  //update the user password when user is not signed in
  updatePassword: async function (req, res) {
    const defaultEmail = req.body.email;
    const lowerCaseEmail = defaultEmail.toLowerCase();

    const userEmailAddress = lowerCaseEmail;
    let passConfirmString = req.body.confirmPassword;
    let passConfirmNewString = req.body.newPassword;

    User.findOne(
      {
        email: userEmailAddress,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "No account associated with this email",
          });
        } else if (user && req.body.confirmPassword !== req.body.newPassword) {
          res.status(400).send({
            success: false,
            msg: "Password did not match",
          });
        } else if (
          passConfirmString.length < 6 &&
          passConfirmNewString.length < 6
        ) {
          res.status(400).send({
            success: false,
            msg: "Password not secure. it must be 6 characters or more",
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
    const defaultEmail = req.body.email;
    const lowerCaseEmail = defaultEmail.toLowerCase();

    User.findOne(
      {
        email: lowerCaseEmail,
      },
      function (err, user) {
        // console.log(user);
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "Authentication Failed, user email or password not correct",
          });
        } else if (user.verified === false) {
          res.status(403).send({
            success: false,
            msg: "Authentication Failed, Please verify your email address",
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
        fullname: decodedtoken.fullname,
        occupation: decodedtoken.occupation,
        street: decodedtoken.street,
        city: decodedtoken.city,
        country: decodedtoken.country,
        phone: decodedtoken.phone,
        email: decodedtoken.email,
        verified: decodedtoken.verified,
        assessmentResponse: decodedtoken.assessmentResponse,
        addressVerified: decodedtoken.addressVerified,
        dateOfBirth: decodedtoken.dateOfBirth,
        dateJoined: decodedtoken.dateJoined,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "No User/Invalid Token" });
    }
  },

  //CREATE NEW/UPDATE USER ADDRESS
  updateAddress: async function (req, res) {
    const userEmailAddress = req.user.email;
    let street = req.body.userStreet;
    let city = req.body.userCity;
    let country = req.body.userCountry;
    //CHECKING IF USER HAS AN ACCOUNT WITH US
    User.findOne(
      {
        email: userEmailAddress,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({
            success: false,
            msg: "Please sign in to Update your address",
          });
        } else if (
          !user ||
          !req.body.userStreet ||
          !req.body.userCity ||
          !req.body.userCountry
        ) {
          res.status(400).send({
            success: false,
            msg: "Please provide all required information",
          });
        }
        // else if (street.length < 11) {
        //   res.status(400).send({
        //     success: false,
        //     msg: "Your street address is incorrect. it must be 11 characters or more",
        //   });
        // }
        else {
          try {
            const updatedAddress = User.updateOne(
              { email: userEmailAddress },
              {
                $set: {
                  street,
                  city,
                  country,
                },
              }
            ).then(() => {
              res.json({
                success: true,
                Message: "Address Successfully updated",
              });
            });
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    );
  },
};

module.exports = functions;
