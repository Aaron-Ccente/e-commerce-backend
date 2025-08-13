import { Router } from "express";
import { getAllOrderOfUser, createOrderProductUser ,updateStateOrderOfUser } from "../controllers/order.controller.js";

const router = Router();
// Ruta para obtener todas las ordenes de un usuario
router.get("/", getAllOrderOfUser);
// Ruta para crear una orden de usuario
router.post("/", createOrderProductUser);
// Ruta para actualizar el estado de una orden de usuario
router.put("/:id_order", updateStateOrderOfUser);

export default router