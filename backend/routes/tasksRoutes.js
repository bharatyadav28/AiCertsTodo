import express from "express";

import {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksControllers.js";

const router = express.Router();

router.route("/").get(getAllTasks).post(addTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
