const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default:
      "https://m.media-amazon.com/images/I/41zaQIbMRCL._SX300_SY300_QL70_FMwebp_.jpg",
    set: (v) =>
      v === ""
        ? "https://m.media-amazon.com/images/I/41zaQIbMRCL._SX300_SY300_QL70_FMwebp_.jpg"
        : v,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model("ProductModel", productSchema);
