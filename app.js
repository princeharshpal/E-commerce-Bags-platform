const express = require("express");
const app = express();
const connectToDB = require("./config/db");
const ProductModel = require("./models/product");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { body, validationResult } = require("express-validator");

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
app.post(
  "/products/new",
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

    await ProductModel.create({
      name,
      brand,
      description,
      image,
      price,
    });
    res.redirect("/");
  })
);

// edit route
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.render("products/edit", { product });
  })
);

// update route
app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    if (!req.body) {
      throw new ExpressError(400, "Send valid data for Product");
    }
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
  })
);

// delete route
app.delete(
  "/products/:id/delete",
  wrapAsync(async (req, res, next) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    console.log(deletedProduct);
    res.redirect("/");
  })
);

// show route
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.render("products/show", { product });
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("server is running");
});
