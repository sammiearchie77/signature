# Project Routes

The `project.route.js` file defines the routes for managing project-related operations in your Node.js application. These routes use the Express.js framework and are associated with the `ProjectController` for handling various CRUD (Create, Read, Update, Delete) operations on projects.

## Routes

1. **Get All Projects**

   - Route: `/`
   - Method: GET
   - Middleware: None
   - Controller Method: `projectCtrl.getAll`
   - Description: Retrieves a list of all projects.

2. **Create Project**

   - Route: `/`
   - Method: POST
   - Middleware: None
   - Controller Method: `projectCtrl.create`
   - Description: Creates a new project.

3. **Get One Project by ID**

   - Route: `/:projectId`
   - Method: GET
   - Middleware: None
   - Controller Method: `projectCtrl.getOne`
   - Description: Retrieves information about a specific project based on its `projectId`.

4. **Update Project by ID**

   - Route: `/:projectId`
   - Method: PUT
   - Middleware: None
   - Controller Method: `projectCtrl.update`
   - Description: Updates an existing project based on its `projectId`.

5. **Delete Project by ID**

   - Route: `/:projectId`
   - Method: DELETE
   - Middleware: None
   - Controller Method: `projectCtrl.delete`
   - Description: Deletes a project based on its `projectId`.

## Middleware

The routes use the `verifyToken` middleware, which likely checks for the presence and validity of a token to ensure that these routes are protected and only accessible to authenticated users. Ensure that the `verifyToken` middleware is correctly implemented and available in your project.

## Usage

To use these project routes in your application, import the `project.route.js` file and mount them on your Express.js app or router.

```javascript
const express = require('express');
const projectRoutes = require('./path-to-project-routes');

const app = express();

// Mount the project routes
app.use('/projects', projectRoutes);

// ... other routes and middleware ...

// Start your Express app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

These routes are available under URLs like `/projects/` for listing and creating projects and `/projects/:projectId` for viewing, updating, and deleting project data.

Ensure that you set up the required controllers and middleware as mentioned in your project.

---
