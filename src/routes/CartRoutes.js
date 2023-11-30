import Authorization from "../Middleware/Autholization";
import {
  addExsting,
  addToCart,
  deleteToCart,
  getCart,
  removeExsting,
} from "../controllers/CartControllers";
import express from "express";

const cartRoutes = express.Router();
cartRoutes.post(
  "/add/:id",
  Authorization,

  addToCart
);
cartRoutes.post("/addCart/:id", Authorization, addExsting);
cartRoutes.post("/removeCart/:id", Authorization, removeExsting);
cartRoutes.get("/Readcart", Authorization, getCart);
cartRoutes.delete("/delete/:id", Authorization, deleteToCart);
export default cartRoutes;
