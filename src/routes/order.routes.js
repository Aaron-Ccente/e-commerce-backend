import { Router } from "express";
import { getAllOrderOfUser, createOrderProductUser ,updateStateOrderOfUser } from "../controllers/order.controller.js";

const router = Router();
router.get("/", getAllOrderOfUser);
router.post("/", createOrderProductUser);
router.put("/:id_order", updateStateOrderOfUser);

export default router