const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const multer = require("multer");
const path = require("path");

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
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
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
app.post("/api/upload", upload.single("profile"), (req, res) => {
  res.json({
    success: 1,
    profile_url: `http://localhost:4000/profile/${req.file.filename}`,
  });
});

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
