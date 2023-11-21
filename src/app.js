import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import AlbumRoutes from "./routes/GalleryRoutes";
import TestRoutes from "./routes/TestmonialRoutes";
import contactRoutes from "./routes/ContactRoutes";
import menuRoutes from "./routes/MenuRoutes";
import serviceRoutes from "./routes/ServiceRoutes";
import eventRoutes from "./routes/eventRoutes";
import cartRoutes from "./routes/CartRoutes";
import reservatioRoutes from "./routes/reservationRoutes";
import blogRoutes from "./routes/BlogRoutes";

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
app.use("/blissmothies/contact", contactRoutes);
app.use("/blissmothies/menu", menuRoutes);
app.use("/blissmothies/services", serviceRoutes);
app.use("/blissmothies/event", eventRoutes);
app.use("/blissmothies/cart", cartRoutes);
app.use("/blissmothies/reservation", reservatioRoutes);
app.use("/blissmothies/blog", blogRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Muhoza",
    message: "Welcome to the Blissmothies API!",
  });
});

export default app;
