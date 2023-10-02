import mongoose from "mongoose";
const gallerySchema = new mongoose.Schema(
  {
    galleryImage: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Album", gallerySchema);
export default Gallery;
