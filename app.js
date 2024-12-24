const express = require("express");
const app = express();
const connectToDB = require("./config/db");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const productsRoutes = require("./routes/products.routes");
const reviewsRoutes = require("./routes/reviews.routes");

connectToDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRoutes);
app.use("/products", reviewsRoutes);

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
