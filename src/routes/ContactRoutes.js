import express from "express";
import {
  createMessage,
  delMessage,
  getMessage,
  getSIngleMessage,
  upMessage,
} from "../controllers/ContactControllers";
import fileUpload from "../helper/multer";
const contactRoutes = express.Router();

contactRoutes.post("/send", fileUpload.single("files"), createMessage);
contactRoutes.get("/read", getMessage);
contactRoutes.get("/read/:id", getSIngleMessage);
contactRoutes.delete("/delete/:id", delMessage);
contactRoutes.put("/update/:id", upMessage);

export default contactRoutes;
