import express from "express";
import fileUpload from "../helper/multer";
import {
  UpGallery,
  createAlbum,
  delGallery,
  getAlbum,
  getSingle,
} from "../controllers/GalleryControllers";

export const AlbumRoutes = express.Router();

AlbumRoutes.post("/create", fileUpload.single("galleryImage"), createAlbum);
AlbumRoutes.put("/update/:id", fileUpload.single("galleryImage"), UpGallery);
AlbumRoutes.get("/read", getAlbum);
AlbumRoutes.get("/read/:id", getSingle);
AlbumRoutes.delete("/delete/:id", delGallery);

export default AlbumRoutes;
