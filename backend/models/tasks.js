import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide task title."],
    minLength: [3, "Title cannot be less than 3 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide task description."],
    minLength: [10, "Description cannot be less than 10 characters"],
    trim: true,
  },
  status: {
    type: String,
    default: "inComplete",
    enum: ["inComplete", "complete"],
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide task due Date."],
  },
});

const TasksModel = mongoose.model("task", tasksSchema);

export default TasksModel;
