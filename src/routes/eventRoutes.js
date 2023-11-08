import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  getAllevent,
  getOne,
  makeevent,
  removeevent,
  updateevent,
} from "../controllers/eventControllers";

const eventRoutes = express.Router();
eventRoutes.post(
  "/create",
  Authorization,
  fileUpload.single("image"),
  makeevent
);
eventRoutes.get("/read", getAllevent);
eventRoutes.get("/read/:id", getOne);
eventRoutes.delete("/delete/:id", Authorization, removeevent);
eventRoutes.put(
  "/update/:id",
  Authorization,
  fileUpload.single("image"),
  updateevent
);

export default eventRoutes;
