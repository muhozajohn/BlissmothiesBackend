import mongoose from "mongoose";
const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    Subtitle: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
    },
    content: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    owner: {
      type: String,
      require: true,
    },
    ownerP: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const menu = mongoose.model("menu", menuSchema);
export default menu;
