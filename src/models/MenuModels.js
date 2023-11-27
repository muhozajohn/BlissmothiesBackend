import mongoose from "mongoose";
const menuSchema = new mongoose.Schema({
  title: {
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
    type: String,
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
});

const menu = mongoose.model("menu", menuSchema);
export default menu;
