const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");

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
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ExpressError("All fields are required");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let errMsg = errors
        .array()
        .map((err) => err.msg)
        .join(`, \n`);
      throw new ExpressError(errors.statusCode, errMsg);
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new ExpressError(400, "Email is already registered");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const newUser = new userModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`/products`);
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
      throw new ExpressError(
        400,
        "Something went wrong, Please try again later"
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new ExpressError(
        400,
        "Something went wrong, Please try again later"
      );
    }

    const token = await user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("/products");
  })
);

module.exports = router;
