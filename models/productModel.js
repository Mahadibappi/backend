const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
        },
        sku: {
            type: String,
            required: true,
            default: "SKU",
            trim: true,
        },
        category: {
            type: String,
            required: [true, "please add a category"],
            trim: true
        },
        quantity: {
            type: String,
            required: [true, "Please add quantity"],
            trim: true
        },
        price: {
            type: String,
            required: [true, "please add a price"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "please add a description"],
            trim: true
        },
        image: {
            type: Object,

        },

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;