import { Router } from "express";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const router = Router();
// Ruta para obtener todas las categorias de los productos
router.get("/", getAllCategories);
// Ruta para crear categorias de productos
router.post("/", createCategory);
// Rtua para editar las categorias de productos
router.put("/:id", updateCategory);
// Rutas para eliminar categorias
router.delete("/:id", deleteCategory)

export default router;