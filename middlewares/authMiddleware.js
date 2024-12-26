const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

module.exports.authenticate = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ExpressError(401, "Unauthorized. Please log in.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  return next();
});
