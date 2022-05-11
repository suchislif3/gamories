import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (base64Image) =>
  await cloudinary.uploader.upload(base64Image, {
    upload_preset: "gamories-app",
  });

export const deleteImage = async (imagePublicId) =>
  await cloudinary.uploader.destroy(imagePublicId);
