import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} from "../controllers/tasks";
export const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

// app.get('/api/v1/tasks')       - get all the tasks
// app.post('/api/v1/tasks')     - create new task
// app.get('/api/v1/tasks/:id')  - get single tasks
// app.patch('/api/v1/tasks/:id'')   -update tasks
// app.delete('/api/v1/tasks/:id'')   - delete tasks
