import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();
// Ruta para obtener todos los productos
router.get("/", getAllProducts);
// Ruta para crear productos
router.post("/", createProduct);
// Ruta para actualizar un producto
router.put("/:id_product", updateProduct);
// Ruta para eliminar un producto
router.delete("/:id_product", deleteProduct);

export default router;