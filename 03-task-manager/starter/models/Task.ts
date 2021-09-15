import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    // default: false,
    // required: [true, "completed is required"],
  },
});

export default mongoose.model("Task", TaskSchema);
