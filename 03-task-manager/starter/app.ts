require("./db/connect");
import express from "express";
import { router } from "./routes/tasks";

const app = express();

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use(express.json());
app.use("/api/v1/tasks", router);
// app.get('/api/v1/tasks')       - get all the tasks
// app.post('/api/v1/tasks')     - create new task
// app.get('/api/v1/tasks/:id')  - get single tasks
// app.patch('/api/v1/tasks/:id'')   -update tasks
// app.delete('/api/v1/tasks/:id'')   - delete tasks

const port = 3000;

app.listen(port, () =>
  console.log(`server is listening on port http://localhost:${port}`)
);
