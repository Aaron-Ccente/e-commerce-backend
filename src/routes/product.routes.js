import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const router = Router();
router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id_product", updateProduct);
router.delete("/:id_product", deleteProduct);

export default router;