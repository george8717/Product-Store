//server.js which is in backend folder

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/product.route.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware to handle json data in req.body
app.use(express.json()); //allows us to accept json data in req.body

app.use("/api/products", productRoutes);


// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Handle all other routes by returning index.html
  app.use( (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
//username:georgeannamattathil_db_user
//password:VeUE9V4JS4m3VuBv
