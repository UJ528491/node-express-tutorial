import express from "express";
import { login, dashboard } from "../controllers/main";
import authMiddleware from "../middleware/auth";

export const router = express.Router();
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);
