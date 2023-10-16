import express from "express";
import Authorization from "../Middleware/Autholization";
import fileUpload from "../helper/multer";
import {
  createService,
  delService,
  getAll,
  getOne,
  upService,
} from "../controllers/ServicesController";
const serviceRoutes = express.Router();
serviceRoutes.post(
  "/create",
  Authorization,
  fileUpload.single("files"),
  createService
);
serviceRoutes.get("/read", getAll);
serviceRoutes.get("/read/:id", getOne);
serviceRoutes.delete("/delete/:id", Authorization, delService);
serviceRoutes.put(
  "/update/:id",
  fileUpload.single("files"),
  Authorization,
  upService
);
export default serviceRoutes;
