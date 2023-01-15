const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");

// crate product

const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;

    //validation 
    if (!name || !category || !quantity || !price) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    // Handle Image Upload 
    let fileData = {};
    if (req.file) {

        // save image to cloudinary
        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory App",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded")
        }
    }

    fileData = {
        fileName: req.file.originalname,
        filePath: uploadFile.source_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
    };

    // Create Product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });
    res.status(200).json(product);

});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.findById({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(products)
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // if product does not exist
    if (!product) {
        res.status(404)
        throw new Error("product not found");
    }

    // if product matches
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }
    res.status(200).json(product)
});

module.exports = {
    createProduct,
    getProducts,
    getProduct
}