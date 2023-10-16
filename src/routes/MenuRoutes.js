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
menuRoutes.get("/read",  getAllmenu);
menuRoutes.get("/read/:id", getOne);
menuRoutes.delete("/delete/:id", Authorization, removeMenu);
menuRoutes.put("/update/:id", Authorization,fileUpload.single("image"), updateMenu);

export default menuRoutes;
