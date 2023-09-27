# Task Model

The `task.model.js` file defines the schema for the Task model in your Node.js application. This model represents tasks and includes fields such as the user assigned to the task, title, description, due date, priority, and status.

## Schema

The Task schema defines the structure of a task document in your MongoDB database:

- `user`: An array of references to User documents representing the user(s) assigned to the task.
- `title`: A string representing the title of the task. It is required.
- `description`: A string representing the description of the task.
- `dueDate`: A date representing the due date for the task.
- `priority`: A string indicating the priority of the task, which can be one of 'high', 'medium', or 'low'.
- `status`: A string indicating the status of the task, which can be one of 'not started', 'in progress', or 'completed'.
- `timestamps`: Automatic timestamp fields for `createdAt` and `updatedAt`.

## Dependencies

This model file relies on the following dependencies:

- `mongoose`: A popular MongoDB object modeling tool for Node.js.

Ensure that the `mongoose` dependency is correctly set up and available in your project.

## Usage

To use this Task model in your application, import it where needed and create, update, or query task data according to your application's logic.

```javascript
const Task = require('../model/task.model');

// Example: Creating a new task
const newTask = new Task({
  user: [userId1, userId2], // Assign the task to one or more users
  title: 'Task Title',
  description: 'Task description...',
  dueDate: new Date('2023-12-31'), // Set the due date
  priority: 'high', // Set the priority
  status: 'not started', // Set the status
  // Other fields...
});

// Save the new task to the database
newTask.save()
  .then(savedTask => {
    console.log('Task saved:', savedTask);
  })
  .catch(error => {
    console.error('Error saving task:', error);
  });
```

You can also use the model's methods for CRUD operations as needed in your application.

```javascript
// Example: Querying tasks
Task.find({ status: 'in progress' })
  .then(tasks => {
    console.log('In-progress tasks:', tasks);
  })
  .catch(error => {
    console.error('Error querying tasks:', error);
  });
