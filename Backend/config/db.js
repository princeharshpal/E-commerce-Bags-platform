const mongoose = require("mongoose")

const connectToDB = () => {
  mongoose;
  mongoose
    .connect("mongodb://127.0.0.1:27017/eCommerce-dev")
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

module.exports = connectToDB;
