const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

// index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const products = await productModel.find({});
    res.status(201).json(products);
  })
);

// create route
router.post(
  "/new",
  // authMiddleware.authenticate,
  [
    body("title")
      .notEmpty()
      .withMessage("Title of product is required")
      .isString()
      .withMessage("Product title must be a string"),
    body("brand")
      .notEmpty()
      .withMessage("Product brand is required")
      .isString()
      .withMessage("Product brand must be a string"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required")
      .isString()
      .withMessage("Product description must be a string"),
    body("price")
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Product price must be a number")
      .custom((value) => {
        if (value < 1) {
          throw new Error("Product price must be at least 1");
        }
        return true;
      }),
  ],
  wrapAsync(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let errMsg = errors
        .array()
        .map((err) => err.msg)
        .join(`, \n`);
      throw new ExpressError(errors.statusCode, errMsg);
    }

    // const { title, description, image, price, brand } = req.body;

    await productModel.create({
      // title,
      // brand,
      // description,
      // image,
      // price,
      ...req.body,
    });
    res.status(201).json("Product created successfully");
  })
);

// edit route
router.get(
  "/:id/edit",
  authMiddleware.authenticate,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      req.flash("error", "Product you requested for doesn't exist!");
      res.redirect("/products");
    }

    res.render("products/edit", { product });
  })
);

// update route
router.put(
  "/:id",
  authMiddleware.authenticate,
  wrapAsync(async (req, res, next) => {
    if (!req.body) {
      throw new ExpressError(400, "Send valid data for Product");
    }
    const { id } = req.params;
    const { name, description, image, price, rating, brand } = req.body;
    await productModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      image,
      rating,
      brand,
    });
    req.flash("success", "Product details updated successfully");
    res.redirect(`/products/${id}`);
  })
);

// delete route
router.delete(
  "/:id/delete",
  authMiddleware.authenticate,
  wrapAsync(async (req, res, next) => {
    const Product = await productModel.findById(req.params.id);

    await reviewModel.deleteMany({ _id: Product.reviews });
    await productModel.findByIdAndDelete(req.params.id);

    req.flash("success", "Product deleted successfully");
    res.redirect("/products");
  })
);

// cart route
router.get("/cart", (req, res) => {
  res.render("products/cart");
});

// show route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("reviews");

    if (!product) {
      req.flash("error", "Product you requested for doesn't exist!");
      res.redirect("/products");
    }

    res.render("products/show", { product });
  })
);

module.exports = router;
