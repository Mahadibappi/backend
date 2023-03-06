const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// crate product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;
  console.log(req.body);

  // validation
  if (!name || !category || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    const product = await Product.create({
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image: result,
    });
    res.status(200).json(product);
  });
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  res.status(200).json(product);
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted" });
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);
  // if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: product?.image,
    },

    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
