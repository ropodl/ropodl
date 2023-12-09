// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadBlogImage(file: string) {
  const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
    // gravity: "face",
    height: 500,
    width: 500,
    // crop: "thumb",
    // folder: "ropodl",
  });

  return { secure_url, public_id };
}

export async function uploadVideo(path: string) {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    path,
    {
      resource_type: "video",
    }
  );
  return { url, public_id };
}

export async function removeImage(id: string) {
  const { result } = await cloudinary.uploader.destroy(id);
  return { result };
}
