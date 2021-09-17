import Task from "../models/Task"
import { asyncWrapper } from "../middleware/async"

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  // res.status(200).json({ tasks });
  // res.status(200).json({tasks, amount: tasks.length})
  res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length } })
})
export const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})
export const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` })
  }
  res.status(200).json({ task })
})
export const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` })
  }
  res.status(200).json({ task })
})
export const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ task: null, success: true })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

export const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    })
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
