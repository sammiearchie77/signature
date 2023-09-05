// controllers/tasksController.js
const Task = require('../models/task.model');

// Controller for retrieving all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller for creating a new task
async function createTask(req, res) {
  const { title, description, deadline, priority, assignedTo, completed } = req.body;

  try {
    const task = new Task({
      title,
      description,
      deadline,
      priority,
      assignedTo,
      completed,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Add more controllers for updating, deleting, and retrieving tasks by ID as needed

module.exports = {
  getAllTasks,
  createTask,
  // Add other task-related controllers here
};
