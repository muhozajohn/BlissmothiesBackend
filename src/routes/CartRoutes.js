import Authorization from "../Middleware/Autholization";
import {
  addToCart,
  deleteToCart,
  getCart,
} from "../controllers/CartControllers";
import fileUpload from "../helper/multer";
import express from "express";

const cartRoutes = express.Router();
cartRoutes.post(
  "/add/:id",
  Authorization,
  fileUpload.single("files"),
  addToCart
);
cartRoutes.get("/Readcart", getCart);
cartRoutes.delete("/delete/:id", Authorization, deleteToCart);
export default cartRoutes;
