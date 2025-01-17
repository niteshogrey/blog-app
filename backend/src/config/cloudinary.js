const cloudinary = require("cloudinary").v2;
require("dotenv").config()

// Cloudinary configuration
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:  process.env.API_KEY ,
    api_secret:  process.env.API_SECRET,
    timeout: 60000,
  });
};


module.exports = connectCloudinary