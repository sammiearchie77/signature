# Task Routes

The `task.routes.js` file defines the routes for managing tasks in your Node.js application. These routes use the Express.js framework and are associated with the `TaskController` for handling various CRUD (Create, Read, Update, Delete) operations on tasks.

## Routes

1. **Get All Tasks**

   - Route: `/`
   - Method: GET
   - Middleware: None
   - Controller Method: `taskCtrl.getAll`
   - Description: Retrieves a list of all tasks.

2. **Create Task**

   - Route: `/`
   - Method: POST
   - Middleware: None
   - Controller Method: `taskCtrl.create`
   - Description: Creates a new task.

3. **Get One Task by ID**

   - Route: `/:taskId`
   - Method: GET
   - Middleware: None
   - Controller Method: `taskCtrl.getOne`
   - Description: Retrieves information about a specific task based on its `taskId`.

4. **Update Task by ID**

   - Route: `/:taskId`
   - Method: PUT
   - Middleware: None
   - Controller Method: `taskCtrl.update`
   - Description: Updates an existing task based on its `taskId`.

5. **Delete Task by ID**

   - Route: `/:taskId`
   - Method: DELETE
   - Middleware: None
   - Controller Method: `taskCtrl.delete`
   - Description: Deletes a task based on its `taskId`.

## Middleware

The routes use the `verifyToken` middleware, which likely checks for the presence and validity of a token to ensure that these routes are protected and only accessible to authenticated users. Ensure that the `verifyToken` middleware is correctly implemented and available in your project.

## Usage

To use these task routes in your application, import the `task.routes.js` file and mount them on your Express.js app or router.

```javascript
const express = require('express');
const taskRoutes = require('../routes/task.routes');

const app = express();

// Mount the task routes
app.use('/tasks', taskRoutes);

// ... other routes and middleware ...

// Start your Express app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

These routes are available under URLs like `/tasks/` for listing and creating tasks and `/tasks/:taskId` for viewing, updating, and deleting tasks.

Ensure that you set up the required controllers and middleware as mentioned in your project.

---

Feel free to customize this README to fit your project's specific needs and documentation standards.