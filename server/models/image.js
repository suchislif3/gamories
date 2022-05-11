import mongoose from "mongoose";

export const imageSchema = mongoose.Schema({
  publicId: { type: String },
  url: { type: String },
});

export const Image = mongoose.model("Image", imageSchema);
