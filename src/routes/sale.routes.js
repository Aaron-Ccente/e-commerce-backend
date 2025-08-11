import { Router } from "express";
import { userBuysFurniture } from "../controllers/sale.controller.js";

const router = Router();
router.post("/", userBuysFurniture);

export default router