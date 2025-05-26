const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function
const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: 'teachers',
    });

    // Delete the local file after upload (optional cleanup)
    fs.unlinkSync(localFilePath);

    return result.secure_url;
  } catch (err) {
    throw new Error('Failed to upload to Cloudinary');
  }
};

module.exports = uploadToCloudinary;
