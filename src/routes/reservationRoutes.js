import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  RemoveRequest,
  getAll,
  makeRequest,
} from "../controllers/reservationControllers";

const reservatioRoutes = express.Router();

reservatioRoutes.post(
  "/send",
  Authorization,
  fileUpload.single("files"),
  makeRequest
);
reservatioRoutes.delete("/delete/:id", RemoveRequest);
reservatioRoutes.get("/read", getAll);
export default reservatioRoutes;
