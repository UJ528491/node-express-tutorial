import express from 'express';
const router = express.Router();

import { register, login, logout, verifyEmail } from '../controllers/authController';
import { authenticateUser } from '../middleware/authentication';

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);
router.post("/verify-email", verifyEmail);

export default router;
