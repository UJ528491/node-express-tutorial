export const getAllTasks = (req, res) => {
  res.send("all items from the file");
};
export const createTask = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};
export const getTask = (req, res) => {
  res.send("get single task");
};
export const updateTasks = (req, res) => {
  res.send("update task");
};
export const deleteTasks = (req, res) => {
  res.send("delete task");
};
