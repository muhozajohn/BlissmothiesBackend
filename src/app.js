import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import AlbumRoutes from "./routes/GalleryRoutes";
import TestRoutes from "./routes/TestmonialRoutes";

const app = express();
dotenv.config();

// Configurations
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.use("/blissmothies/users", userRoutes);
app.use("/blissmothies/album", AlbumRoutes);
app.use("/blissmothies/Testmoniols", TestRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Muhoza",
    message: "Welcome to the Blissmothies API!",
  });
});

export default app;
