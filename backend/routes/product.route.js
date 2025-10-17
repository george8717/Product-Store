import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

//Now go to Postman desktop app

//console.log(process.env.MONGO_URI);

//put for updating all fields whereas
//  patch for updating specific fields
router.put("/:id", updateProduct);

//for deleting a product
router.delete("/:id", deleteProduct);

export default router;
