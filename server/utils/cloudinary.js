const cloudinary = require("cloudinary").v2;
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

exports.uploadImage = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    path,
    {
      // gravity: "face",
      height: 500,
      width: 500,
      // crop: "thumb",
      folder: "ropodl",
    }
  );

  return { url, public_id };
};

exports.uploadVideo = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    path,
    {
      resource_type: "video",
    }
  );
  return { url, public_id };
};

exports.removeImage = async (id) => {
  const { result } = await cloudinary.v2.uploader.destroy(id);
  return { result };
};

module.exports = cloudinary;
