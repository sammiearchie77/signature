# User Routes

The `user.routes.js` file defines the routes for managing user-related operations in your Node.js application. These routes use the Express.js framework and are associated with the `UserController` for handling various CRUD (Create, Read, Update, Delete) operations on user data.

## Routes

1. **Get All Users**

   - Route: `/`
   - Method: GET
   - Middleware: None
   - Controller Method: `userCtrl.getAll`
   - Description: Retrieves a list of all users.

2. **Create User**

   - Route: `/`
   - Method: POST
   - Middleware: None
   - Controller Method: `userCtrl.create`
   - Description: Creates a new user.

3. **Get One User by ID**

   - Route: `/:userId`
   - Method: GET
   - Middleware: None
   - Controller Method: `userCtrl.getOne`
   - Description: Retrieves information about a specific user based on their `userId`.

4. **Update User by ID**

   - Route: `/:userId`
   - Method: PUT
   - Middleware: None
   - Controller Method: `userCtrl.update`
   - Description: Updates an existing user based on their `userId`.

5. **Delete User by ID**

   - Route: `/:userId`
   - Method: DELETE
   - Middleware: None
   - Controller Method: `userCtrl.delete`
   - Description: Deletes a user based on their `userId`.

## Middleware

The routes use the `verifyToken` middleware, which likely checks for the presence and validity of a token to ensure that these routes are protected and only accessible to authenticated users. Ensure that the `verifyToken` middleware is correctly implemented and available in your project.

## Usage

To use these user routes in your application, import the `user.routes.js` file and mount them on your Express.js app or router.

```javascript
const express = require('express');
const userRoutes = require('../routes/user.routes');

const app = express();

// Mount the user routes
app.use('/users', userRoutes);

// ... other routes and middleware ...

// Start your Express app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

These routes are available under URLs like `/users/` for listing and creating users and `/users/:userId` for viewing, updating, and deleting user data.
