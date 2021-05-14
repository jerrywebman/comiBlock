var User = require("../models/user");
var Money = require("../models/money");
// var UserReferral = require("../models/userReferral");
var jwt = require("jwt-simple");
var config = require("../config/dbconfig");
const { token } = require("morgan");

var functions = {
  addNew: async function (req, res) {
    let userEmail = await User.findOne({ email: req.body.email });
    let userUsername = await User.findOne({ username: req.body.username });
    if (
      !req.body.accountType ||
      !req.body.fullname ||
      !req.body.email ||
      !req.body.username ||
      !req.body.password
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else if (userEmail) {
      return res.status(400).send({
        success: false,
        msg: "a user with this email already exists!",
      });
    } else if (userUsername) {
      return res.status(400).send({
        success: false,
        msg: "a user with this username already exists!",
      });
    } else {
      //CREATING A NEW USER Money
      try {
        const newMoney = {
          _id: req.body.email,
          userEmail: req.body.email,
          userUsername: req.body.username,
          userFullname: req.body.fullname,
          accountType: req.body.accountType,
          nairaBalance: 0,
          referralBonusBalance: 0,
        };
        await new Money(newMoney).save();
      } catch (err) {
        console.log(err);
      }
      //CREATING A NEW USER
      var newUser = User({
        accountType: req.body.accountType,
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
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
          res.json({ success: true, msg: "User Successfully Saved" });
        }
      });
    }
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
        fullname: decodedtoken.fullname,
        username: decodedtoken.username,
        email: decodedtoken.email,
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
