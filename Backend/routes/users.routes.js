const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  wrapAsync(async (req, res) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMsg = errors
          .array()
          .map((err) => err.msg)
          .join(", ");
        throw new ExpressError(400, errorMsg);
      }

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        throw new ExpressError(
          400,
          "Email is already registered, Please login!"
        );
      }

      const hashedPassword = await userModel.hashPassword(password);

      const newUser = new userModel({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      req.flash("success", "Welcome to Bags.");
      res.redirect(`/products`);
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/users/register", { error: e.message });
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  wrapAsync(async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      throw new ExpressError(400, errorMessages);
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw new ExpressError(400, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ExpressError(400, "Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/products");
  })
);

router.get("/logout", authMiddleware.authenticate, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.redirect("/products");
});

module.exports = router;
