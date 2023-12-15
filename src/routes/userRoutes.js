import express from "express";
import fileUpload from "../helper/multer";
import {
  createUser,
  delUser,
  getOneUsers,
  getUsers,
  login,
  upuser,
} from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.post("/create", fileUpload.single("userProfile"), createUser);
userRoutes.post("/login", fileUpload.single("userProfile"), login);
userRoutes.get("/read", getUsers);
userRoutes.get("/read/:id", getOneUsers);
userRoutes.delete("/delete/:id", delUser);
userRoutes.put("/update/:id", fileUpload.single("userProfile"), upuser);
export default userRoutes;
