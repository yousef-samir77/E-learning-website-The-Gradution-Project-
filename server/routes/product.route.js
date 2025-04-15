import express from "express";
import {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
