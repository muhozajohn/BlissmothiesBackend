import Authorization from "../Middleware/Autholization";
import { addToCart } from "../controllers/CartControllers";
import fileUpload from "../helper/multer";
import express from "express";

const cartRoutes = express.Router();
cartRoutes.post(
  "/add/:id",
  Authorization,
  fileUpload.single("files"),
  addToCart
);
export default cartRoutes;
