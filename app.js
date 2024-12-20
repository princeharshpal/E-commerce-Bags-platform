const express = require("express");
const app = express();
const connectToDB = require("./config/db");
const ProductModel = require("./models/product");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

connectToDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// index route
app.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.render("products/home", { products });
});

// new route
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// create route
app.post("/products/new", async (req, res) => {
  const { name, description, image, price, brand } = req.body;

  await ProductModel.create({
    name,
    brand,
    description,
    image,
    price,
  });
  res.redirect("/");
});

// edit route
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.render("products/edit", { product });
});

// update route
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, rating, brand } = req.body;
  await ProductModel.findByIdAndUpdate(id, {
    name,
    description,
    price,
    image,
    rating,
    brand,
  });
  res.redirect(`/products/${id}`);
});

// delete route
app.delete("/products/:id/delete", async (req, res) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
  console.log(deletedProduct);
  res.redirect("/");
});

// show route
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.render("products/show", { product });
});

app.listen(3000, () => {
  console.log("server is running");
});
