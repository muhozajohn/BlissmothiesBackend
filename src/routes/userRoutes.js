import express from "express";
import fileUpload from "../helper/multer";
import { createUser } from "../controllers/userController";
const userRoutes = express.Router();

userRoutes.post("/create", fileUpload.single("userProfile") , createUser);

export default userRoutes;
