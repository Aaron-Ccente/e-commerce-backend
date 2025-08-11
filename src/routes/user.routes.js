import { Router } from "express";

import { createUser, loginUserOrAdmin, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUserOrAdmin);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser)

export default router