import express from "express";
import { verifyTokenAndAuth } from "../verifyToken.js";
import {
  CreateProduct,
  GetProducts,
  // GetSingleProduct,
  // DeleteProduct,
} from "../controllers/product.js";
const router = express.Router();

router.post("/:id", verifyTokenAndAuth, CreateProduct);
router.get("/", GetProducts);
// router.get("/:productId", GetSingleProduct);
// router.patch("/:id", verifyTokenAndAuth, UpdateProduct);
// router.delete("/:id", verifyTokenAndAuth, DeleteProduct);

export default router;
