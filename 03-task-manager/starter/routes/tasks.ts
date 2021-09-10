import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  updateTasks,
  deleteTasks,
} from "../controllers/tasks";
export const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTasks).delete(deleteTasks);
