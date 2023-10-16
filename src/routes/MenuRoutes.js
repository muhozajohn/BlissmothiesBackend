import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  getAllmenu,
  getOne,
  makemenu,
  removeMenu,
  updateMenu,
} from "../controllers/MenuControllers";

const menuRoutes = express.Router();
menuRoutes.post("/create", Authorization, fileUpload.single("image"), makemenu);
menuRoutes.get("/read", Authorization, getAllmenu);
menuRoutes.get("/read/:id", Authorization, getOne);
menuRoutes.delete("/delete/:id", Authorization, removeMenu);
menuRoutes.put("/update/:id", Authorization,fileUpload.single("image"), updateMenu);

export default menuRoutes;
