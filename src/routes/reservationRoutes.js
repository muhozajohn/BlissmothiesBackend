import express from "express";
import fileUpload from "../helper/multer";
import {
  RemoveRequest,
  makeRequest,
} from "../controllers/reservationControllers";

const reservatioRoutes = express.Router();

reservatioRoutes.post("/send", fileUpload.single("files"), makeRequest);
reservatioRoutes.delete("/delete/:id", RemoveRequest);
export default reservatioRoutes;
