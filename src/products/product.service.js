//service layer bertujuan handle bisnis logic

const prisma = require("../db");
const {
  findAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findAllProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("product not found");
  }

  return product;
};

const postProduct = async (productData) => {
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

  const product = await insertProduct(productData);
};

const UpdateProductById = async (productData, id) => {
  await getProductById(id);

  const product = await updateProduct(productData, id);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  const product = await deleteProduct(id);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  UpdateProductById,
  deleteProductById,
};
