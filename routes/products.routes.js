const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const reviewModel =  require("../models/review.model")
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { body, validationResult } = require("express-validator");

// index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const products = await productModel.find({});
    res.render("products/home", { products });
  })
);

// new route
router.get("/new", (req, res) => {
  res.render("products/new");
});

// create route
router.post(
  "/new",
  [
    body("name")
      .notEmpty()
      .withMessage("Product name is required")
      .isString()
      .withMessage("Product name must be a string"),
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

    const { name, description, image, price, brand } = req.body;

    await productModel.create({
      name,
      brand,
      description,
      image,
      price,
    });
    res.redirect("/products");
  })
);

// edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.render("products/edit", { product });
  })
);

// update route
router.put(
  "/:id",
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
    res.redirect(`/products/${id}`);
  })
);

// delete route
router.delete(
  "/:id/delete",
  wrapAsync(async (req, res, next) => {
    const Product = await productModel.findById(req.params.id);

    await reviewModel.deleteMany({ _id: Product.reviews });
    await productModel.findByIdAndDelete(req.params.id);

    res.redirect("/products");
  })
);

// show route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("reviews");

    if (!product) {
      throw new ExpressError(404, "Product not found.");
    }

    res.render("products/show", { product });
  })
);

module.exports = router;
