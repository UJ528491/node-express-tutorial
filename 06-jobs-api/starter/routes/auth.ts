import { Router } from "express";
import { register, login } from "../controllers/auth";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
