import { Router } from "express";
import { getFilteredFurniture } from '../controllers/filter.controller.js'

const router = Router();
router.get("/", getFilteredFurniture)

export default router