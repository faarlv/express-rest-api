const express = require("express");
const doetenv = require("dotenv");

const app = express();

doetenv.config();

const PORT = process.env.PORT;

app.use(express.json());

const productController = require("./products/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`running in port ${PORT}`);
});
