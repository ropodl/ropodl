// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";

const config = useRuntimeConfig();

// const { cloudinary_name, cloudinary_key, cloudinary_secret } = config;

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_key,
  api_secret: config.cloudinary_secret,
  secure: true,
});

export async function uploadBlogImage(file: string) {
  console.log(config.cloudinary_name);

  const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
    // gravity: "face",
    height: 600,
    // width: 500,
    crop: "scale",
    folder: "ropodl/blog",
    resource_type: "image",
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
