import express from "express";
import {
  createMessage,
  delMessage,
  getMessage,
  getSIngleMessage,
  replyMessage,
  upMessage,
} from "../controllers/ContactControllers";
import fileUpload from "../helper/multer";
const contactRoutes = express.Router();

contactRoutes.post("/send", fileUpload.single("files"), createMessage);
contactRoutes.get("/read", getMessage);
contactRoutes.get("/read/:id", getSIngleMessage);
contactRoutes.delete("/delete/:id", delMessage);
contactRoutes.put("/update/:id", fileUpload.single("files"), upMessage);
contactRoutes.put("/reply/:id", fileUpload.single("files"), replyMessage);

export default contactRoutes;
