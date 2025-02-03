const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

module.exports.authenticate = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error", "Please login!");
    res.redirect("/users/login");
    throw new ExpressError(401, "Unauthorized. Please log in.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    req.flash("error", "Please login!");
    res.redirect("/users/login");
    throw new ExpressError(401, "Unauthorized. Please log in.");
  }
});
