// routes/tasks.js
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller'); 

// Define routes for tasks
router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
// Add more routes using tasksController as needed
module.exports = router;
