const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
var Verification = require("./models/verification");
const verify = require("./verifyToken");

//get routes
const routes = require("./routes/index");

connectDB();

const app = express();

// file upload starts

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${req.user.email}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000,
  },
});
app.use("/profile", express.static("upload/images"));
// app.use("/profile", express.static("upload/images/govtid"));

app.post(
  "/api/upload/selfie",
  verify,
  upload.single("profiles"),
  (req, res) => {
    var newVerification = Verification({
      userEmail: req.user.email,
      userFullname: req.user.fullname,
      selfieUrl: `https://comiblock.herokuapp.com/profile/${req.file.filename}`,
    });
    newVerification.save(function (err, Verification) {
      if (err) {
        res.json({
          success: false,
          msg: "Failed to Save Verification details",
        });
      } else {
        res.json({
          success: true,
          msg: "successfully created Verification details(Seifie)",
          selfieUrl: `https://comiblock.herokuapp.com/profile/${req.file.filename}`,
        });
      }
    });
  }
);

app.post(
  "/api/upload/govtid",
  verify,
  upload.single("profiles"),
  (req, res) => {
    var newVerification = Verification({
      userEmail: req.user.email,
      userFullname: req.user.fullname,
      govtIdUrl: `https://comiblock.herokuapp.com/profile/${req.file.filename}`,
    });
    newVerification.save(function (err, Verification) {
      if (err) {
        res.json({
          success: false,
          msg: "Failed to Save Verification details",
        });
      } else {
        res.json({
          success: true,
          msg: "successfully created Verification details(Govt ID)",
          govtIdUrl: `https://comiblock.herokuapp.com/profile/${req.file.filename}`,
        });
      }
    });
  }
);

// app.post(
//   "/api/upload/selfie",
//   verify,
//   upload.array("profiles", 2),
//   (req, res) => {
//     var newVerification = Verification({
//       userEmail: req.user.email,
//       userFullname: req.user.fullname,
//       govtIdUrl: `https://comiblock.herokuapp.com/profile/${req.files[0].filename}`,
//       selfieUrl: `https://comiblock.herokuapp.com/profile/${req.files[1].filename}`,
//     });
//     newVerification.save(function (err, Verification) {
//       if (err) {
//         res.json({
//           success: false,
//           msg: "Failed to Save Verification details",
//         });
//       } else {
//         res.json({
//           success: true,
//           msg: "successfully created Verification details",
//           govtIdUrl: `https://comiblock.herokuapp.com/profile/${req.files[0].filename}`,
//           selfieUrl: `https://comiblock.herokuapp.com/profile/${req.files[1].filename}`,
//         });
//       }
//     });
//   }
// );
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errHandler);
///files upload ends here

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
//cors allows us to call data/api from cross domains
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// app.use(cors({ origin: "https://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

//GETTING INFO
app.use(passport.initialize());
require("./config/passport")(passport);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);
