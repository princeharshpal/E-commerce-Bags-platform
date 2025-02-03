const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

