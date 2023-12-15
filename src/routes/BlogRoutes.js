import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  createPost,
  deletePost,
  getBlog,
  getOne,
  updatePost,
} from "../controllers/BlogController";
import {
  deleteComment,
  getComment,
  makeComment,
  getOneComment,
  updateComment,
} from "../controllers/commentController";
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
blogRoutes.put(
  "/comment/:id",
  Authorization,
  fileUpload.single("files"),
  updateComment
);
blogRoutes.put(
  "/update/:id",
  Authorization,
  fileUpload.single("image"),
  updatePost
);
blogRoutes.get("/read", getBlog);
blogRoutes.get("/readComment", getComment);
blogRoutes.get("/read/:id", getOne);
blogRoutes.get("/readComment/:id", getOneComment);
blogRoutes.delete("/delete/:id", deletePost);
blogRoutes.delete("/deleteComment/:id", deleteComment);

export default blogRoutes;
