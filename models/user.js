var mongoose = require("mongoose");
var schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    match: /.+\@.+\..+/,
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  firstname: {
    type: String,
    require: true,
    min: 2,
    max: 255,
  },
  Surname: {
    type: String,
    require: true,
    min: 2,
    max: 255,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
  verifyCode: {
    type: Number,
    require: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password
userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

//authenticate
userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
module.exports = mongoose.model("User", userSchema);
