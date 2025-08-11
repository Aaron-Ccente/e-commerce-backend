import { Router } from "express";
import { getAllFavorites, createFavoriteProduct, deleteFavoriteProduct } from "../controllers/favorite.controller";

const router = Router();
router.get("/", getAllFavorites);
router.post("/", createFavoriteProduct);
router.delete("/:id_product", deleteFavoriteProduct)

export default router