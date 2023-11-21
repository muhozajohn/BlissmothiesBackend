import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  createPost,
  deletePost,
  getBlog,
  getOne,
} from "../controllers/BlogController";
import { makeComment } from "../controllers/commentController";
const blogRoutes = express.Router();

blogRoutes.post(
  "/create",
  Authorization,
  fileUpload.single("image"),
  createPost
);
blogRoutes.post(
  "/comment/:id",
  Authorization,
  fileUpload.single("files"),
  makeComment
);
blogRoutes.get("/read", getBlog);
blogRoutes.get("/read/:id", getOne);
blogRoutes.delete("/delete/:id", deletePost);

export default blogRoutes;
