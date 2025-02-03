const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
  },
  textColor: {
    type: String,
  },
  panelColor: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Hand bags",
      "Backpacks",
      "Shoulder Bags",
      "Laptop Bgas",
      "Travel Bags",
      "Eco-Friendly Bags",
    ],
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
    default: 1,
    min: 1,
    max: 5,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewModel",
    },
  ],
});

module.exports = mongoose.model("ProductModel", productSchema);
