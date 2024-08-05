const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  postProduct,
  UpdateProductById,
  deleteProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send("product not found");
  }
});

router.post("/", async (req, res) => {
  const productData = req.body;

  const product = await postProduct(productData);

  res.send({
    data: product,
    message: "data post success",
  });
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    if (
      !(
        productData.name &&
        productData.description &&
        productData.image &&
        productData.price
      )
    ) {
      return res.status(400).send("field tidak lengkap");
    }

    const product = await UpdateProductById(productData, productId);

    res.send({
      data: product,
      message: "edit data success",
    });
  } catch (error) {
    res.status(400).send("product not found");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(productId);
    res.send("product deleted");
  } catch (error) {
    res.status(400).send("product not found");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await UpdateProductById(productData, productId);
    res.send("update patch successfull");
  } catch (error) {
    res.status(400).send("product not found");
  }
});

module.exports = router;
