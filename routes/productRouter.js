const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

const protect = require("../middleWare/authMiddleware");

router.post(
  "/",
  (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  },
  protect,
  createProduct
);
router.patch("/:id", protect, updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
