import { Router } from "express";
import { getFilteredFurniture } from '../controllers/filter.controller.js'

const router = Router();
// Ruta para obtener los productos segun filtro
router.get("/", getFilteredFurniture)

export default router