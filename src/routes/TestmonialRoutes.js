import express from "express";
import fileUpload from "../helper/multer";
import Authorization from "../Middleware/Autholization";
import {
  createTestmoniols,
  delTest,
  getAllTestmoniols,
  getSingle,
} from "../controllers/TestmonialsController";
export const TestRoutes = express.Router();

TestRoutes.post(
  "/create",
  Authorization,
  fileUpload.single("profile"),
  createTestmoniols
);
TestRoutes.put(
  "/update/:id",
  Authorization,
  fileUpload.single("profile"),
  createTestmoniols
);

TestRoutes.get("/read",Authorization, getAllTestmoniols);
TestRoutes.get("/read/:id",Authorization, getSingle);
TestRoutes.delete("/delete",Authorization, delTest);

export default TestRoutes;
