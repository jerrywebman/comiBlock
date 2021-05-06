const jwt = require("jwt-simple");

module.exports = function (req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    var token = req.headers.authorization.split(" ")[1];
    var decodedtoken = jwt.decode(token, process.env.TOKEN_SECRET);
    req.user = decodedtoken;
    next();
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "Access Denied/User not found" });
  }
};
