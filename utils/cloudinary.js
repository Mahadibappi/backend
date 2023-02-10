const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");

dotenv.config()
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET
})

module.exports = cloudinary;