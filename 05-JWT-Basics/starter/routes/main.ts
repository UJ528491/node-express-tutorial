const express = require("express");

export const router = express.Router();
import { login, dashboard } from "../controllers/main";

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);
