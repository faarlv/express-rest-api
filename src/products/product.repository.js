const prisma = require("../db");

const findAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    },
  });
  return product;
};

const updateProduct = async (productData, id) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
};
const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
};
module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
