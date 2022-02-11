import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";
import uploadProductImage from "../controllers/uploadsController";

export const router = express.Router();

router.route(".").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);
