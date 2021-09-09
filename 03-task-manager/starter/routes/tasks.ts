import express from "express";
import { getAllTasks } from "../controllers/tasks";
export const router = express.Router();

router.route("/").get(getAllTasks);
