import Task from "../models/Task";
export const getAllTasks = (req, res) => {
  res.send("all items from the file");
};
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};
export const getTask = (req, res) => {
  res.json({ id: req.params.id });
};
export const updateTask = (req, res) => {
  res.json({ id: req.params.id });
};
export const deleteTask = (req, res) => {
  res.send("delete task");
};
