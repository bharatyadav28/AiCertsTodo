import { promises as fs } from "fs";
import path from "path";
import url from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "DataStore/tasks.json");

const getAllTasks = async (req, res) => {
  const content = await fs.readFile(filePath);
  const tasks = JSON.parse(content);

  return res.status(200).json({ tasks });
};

const addTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const uniqueId = uuidv4();
  // console.log("dueData", typeof dueDate);

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "Please provide all task details" });
  }

  const filteredData = {
    title: title.trim(),
    description: description.trim(),
    status: "incomplete",
    dueDate: dueDate.trim(),
    id: uniqueId,
  };

  // fields validation
  if (filteredData.title.length < 3) {
    return res
      .status(400)
      .json({ message: "Title cannot have less than 3 characters." });
  }
  if (filteredData.title.description < 7) {
    return res
      .status(400)
      .json({ message: "Description cannot have less than 7 characters." });
  }

  // fetch saved  tasks
  const content = await fs.readFile(filePath);
  const tasks = JSON.parse(content);

  // add new tasks
  let data = tasks;
  if (!data) {
    data = filteredData;
  } else {
    data.push(filteredData);
  }

  const jsonData = JSON.stringify(data, null, 2);

  // save tasks to file
  await fs.writeFile(filePath, jsonData, "utf-8");

  return res.status(201).json({ message: "success" });
};

const getTask = async (req, res) => {
  const id = req.params.id;

  const content = await fs.readFile(filePath);
  const tasks = JSON.parse(content);
  if (!tasks) {
    return res.status(400).json({ message: "No task exists " });
  }

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res
      .status(400)
      .json({ message: `No task exists with this id ${id}.` });
  }

  return res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "Please provide all task details" });
  }

  // allowed status field values
  const allowedStatus = ["incomplete", "complete"];

  const filteredData = {
    title: title.trim(),
    description: description.trim(),
    status: status || "incomplete",
    dueDate: dueDate.trim(),
  };

  //  fields validation
  if (filteredData.title.length < 3) {
    return res
      .status(400)
      .json({ message: "Title cannot have less than 3 characters." });
  }
  if (filteredData.title.description < 7) {
    return res
      .status(400)
      .json({ message: "Description cannot have less than 7 characters." });
  }

  if (!allowedStatus.includes(filteredData.status)) {
    return res.status(400).json({ message: "Status value not supported." });
  }

  //  fetch all tasks
  const content = await fs.readFile(filePath);
  const tasks = JSON.parse(content);
  if (!tasks) {
    return res.status(400).json({ message: "No task exists " });
  }

  // check if required tasks exists
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res
      .status(400)
      .json({ message: `No task exists with this id ${id}.` });
  }

  // update the task with incoming data
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return { id: task.id, ...filteredData };
    }
    return task;
  });

  // save tasks back to file
  const jsonData = JSON.stringify(updatedTasks, null, 2);
  await fs.writeFile(filePath, jsonData, "utf-8");

  return res.status(200).json({ message: "task updated successfully" });
};

const deleteTask = async (req, res) => {
  const id = req.params.id;

  // fetch all tasks
  const content = await fs.readFile(filePath);
  const tasks = JSON.parse(content);
  if (!tasks) {
    return res.status(400).json({ message: "No tasks exists " });
  }

  // check if task with incoming id exists
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res
      .status(400)
      .json({ message: `No task exists with this id ${id}.` });
  }

  // remove the task from array
  const updatedTasks = tasks.filter((task) => task.id !== id);

  //  save tasks back to file
  const jsonData = JSON.stringify(updatedTasks, null, 2);
  await fs.writeFile(filePath, jsonData, "utf-8");

  return res.status(200).json({ message: "task deleted successfully" });
};

export { getAllTasks, getTask, addTask, updateTask, deleteTask };
