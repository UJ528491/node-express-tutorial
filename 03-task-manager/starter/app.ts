import express from "express";
const app = express();

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// app.get('/api/v1/tasks')       - get all the tasks
// app.post('/api/v1/tasks')     - create new task
// app.get('/api/v1/tasks/:id')  - get single tasks
// app.patch('/api/v1/tasks/:id'')   -update tasks
// app.delete('/api/v1/tasks/:id'')   - delete tasks

const port = 3000;

app.listen(port, () =>
  console.log(`server is listening on port http://localhost:${port}`)
);
