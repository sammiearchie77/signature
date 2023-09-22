# User Service

The `UserService` class in the `user.service.js` file provides services related to user management in your Node.js application. It includes methods for creating, retrieving, updating, and deleting user data.

## Methods

1. **Create User**

   - Method: `create(data)`
   - Description: Creates a new user with the provided data and saves it to the database.

2. **Get All Users**

   - Method: `getAll()`
   - Description: Retrieves a list of all users from the database, excluding sensitive information like passwords.

3. **Get One User by ID**

   - Method: `getOne(userId)`
   - Description: Retrieves information about a specific user based on their `userId`. If the user doesn't exist, it throws a custom error.

4. **Update User by ID**

   - Method: `update(userId, data)`
   - Description: Updates an existing user based on their `userId` with the provided data. If the user doesn't exist, it throws a custom error.

5. **Delete User by ID**

   - Method: `delete(userId)`
   - Description: Deletes a user based on their `userId`. This method sets the `isActive` flag to `false`. If the user doesn't exist, it throws a custom error.

## Dependencies

The `UserService` class relies on the `User` model for interacting with the database and the `CustomError` utility for handling custom error messages.

## Usage

You can import and use the `UserService` class in your controllers to handle user management operations.

Example:

```javascript
const UserService = require('../services/user.service');

// Create a new user
const userData = { /* user data */ };
const newUser = await UserService.create(userData);

// Retrieve all users
const allUsers = await UserService.getAll();

// Retrieve one user by ID
const userId = 'user_id_here';
const user = await UserService.getOne(userId);

// Update user information
const updatedUserData = { /* updated data */ };
const updatedUser = await UserService.update(userId, updatedUserData);

// Delete a user by ID
await UserService.delete(userId);
```

Ensure that you handle errors and validations appropriately in your controllers when using these user management methods.

---

Customize and integrate these user management methods into your project as needed.