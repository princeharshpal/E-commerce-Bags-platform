const ProductModel = require("../models/product");
const initData = require("./db");
const connectToDb = require("../config/db");

connectToDb();

const initDb = async () => {
  await ProductModel.deleteMany({});
  await ProductModel.insertMany( initData.data );
  console.log("data was initialized");
};

initDb();
