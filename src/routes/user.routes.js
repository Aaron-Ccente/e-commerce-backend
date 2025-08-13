import { Router } from "express";

import { createUser, loginUserOrAdmin, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();
// Ruta para crear un usuario - Register
router.post("/", createUser);
// Ruta para login del usuario
router.post("/login", loginUserOrAdmin);
// Ruta para actualizar el usuario
router.put("/:id", updateUser);
// Ruta para eliminar un usuario
router.delete("/:id", deleteUser)

export default router