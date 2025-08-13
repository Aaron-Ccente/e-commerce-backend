import { Router } from "express";
import { getAllFavorites, createFavoriteProduct, deleteFavoriteProduct } from "../controllers/favorite.controller.js";

const router = Router();
// Ruta para obtener los productos añadidos a favoritos
router.get("/", getAllFavorites);
// Ruta para que el usuario marque el producto como favorito
router.post("/", createFavoriteProduct);
// Ruta para eliminar un producto
router.delete("/:id_product", deleteFavoriteProduct)

export default router