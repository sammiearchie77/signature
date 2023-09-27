# **Task** Service

The `TaskService` class in the `task.service.js` file provides services related to task management in your Node.js application. It includes methods for creating, retrieving, updating, and deleting task data.

## Methods

1. **Create Task**

   - Method: `create(data)`
   - Description: Creates a new task with the provided data and saves it to the database.

2. **Get All Tasks**

   - Method: `getAll()`
   - Description: Retrieves a list of all tasks from the database.

3. **Get One Task by ID**

   - Method: `getOne(taskId)`
   - Description: Retrieves information about a specific task based on their `taskId`. If the task doesn't exist, it throws a custom error.

4. **Update Task by ID**

   - Method: `update(taskId, data)`
   - Description: Updates an existing task based on their `taskId` with the provided data. If the task doesn't exist, it throws a custom error.

5. **Delete Task by ID**

   - Method: `delete(taskId)`
   - Description: Deletes a task based on their `taskId`. This method sets the `isActive` flag to `false`. If the task doesn't exist, it throws a custom error.

## Dependencies

The `taskService` class relies on the `Task` model for interacting with the database and the `CustomError` utility for handling custom error messages.

## Usage

You can import and use the `taskService` class in your controllers to handle task management operations.

Example:

```javascript
const taskService = require('../services/task.service');

// Create a new task
const taskData = { /* task data */ };
const newtask = await taskService.create(taskData);

// Retrieve all tasks
const alltasks = await taskService.getAll();

// Retrieve one task by ID
const taskId = 'task_id_here';
const task = await taskService.getOne(taskId);

// Update task information
const updatedtaskData = { /* updated data */ };
const updatedtask = await taskService.update(taskId, updatedtaskData);

// Delete a task by ID
await taskService.delete(taskId);

