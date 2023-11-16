import Authorization from "../Middleware/Autholization";
import { addToCart, getCart } from "../controllers/CartControllers";
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
export default cartRoutes;
