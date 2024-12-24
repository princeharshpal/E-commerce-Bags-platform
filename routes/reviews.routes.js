const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { body } = require("express-validator");

// review route
router.post(
  "/:id/review",
  [
    body("rating")
      .isEmpty()
      .withMessage("Please give some rating from 1-5 to save the review")
      .isNumeric()
      .withMessage("rating should be a number"),
    body("comments")
      .isEmpty()
      .withMessage("please give some comment to save the review"),
  ],
  wrapAsync(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await productModel.findById(req.params.id);

    if (!product) {
      throw new ExpressError(404, "Product not found.");
    }

    let newReview = await reviewModel.create({
      rating,
      comment,
      product: req.params.id,
    });

    product.reviews.push(newReview);

    await product.save();

    res.redirect(`/products/${req.params.id}`);
  })
);

router.delete(
  "/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await productModel.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await reviewModel.findByIdAndDelete(reviewId);

    res.redirect(`/products/${id}`);
  })
);

module.exports = router;
