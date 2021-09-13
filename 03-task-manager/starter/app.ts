import express from "express";
import { router } from "./routes/tasks";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";
dotenv.config();
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
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`server is listening on "http://localhost:${port}"`)
    );
  } catch (error) {}
};

start();
