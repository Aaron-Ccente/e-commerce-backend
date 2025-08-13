import { Router } from "express";
import { userBuysFurniture } from "../controllers/sale.controller.js";

const router = Router();
// Ruta para la compra de un producto
router.post("/", userBuysFurniture);

export default router