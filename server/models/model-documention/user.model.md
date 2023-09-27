# User Model

The `user.model.js` file defines the schema for the User model in your Node.js application. This model represents user data and includes fields such as first name, last name, email, password, role, and various other attributes.

## Schema

The User schema defines the structure of a user document in your MongoDB database:

- `firstname`: A string representing the user's first name. It is required.
- `lastname`: A string representing the user's last name. It is required.
- `email`: A string representing the user's email address. It must be unique and is required.
- `password`: A string representing the user's hashed password.
- `role`: A string representing the user's role, which can be either "user" or "admin." It defaults to "user."
- `isActive`: A boolean indicating whether the user account is active. It defaults to `true`.
- `isVerified`: A boolean indicating whether the user's email has been verified. It defaults to `false`.
- `timestamps`: Automatic timestamp fields for `createdAt` and `updatedAt`.

## Dependencies

This model file relies on the following dependencies:

- `mongoose`: A popular MongoDB object modeling tool for Node.js.
- `bcrypt`: A library for hashing passwords.
- `config`: A configuration file that likely contains settings for your application.

Ensure that these dependencies are correctly set up and available in your project.

## Pre-Save Hook

There is a pre-save hook defined in the schema, which automatically hashes the user's password before saving it to the database. This ensures that user passwords are securely stored.

## Middleware (Optional)

There is commented-out middleware that you can use to cascade delete related data when a user is deleted. It includes deleting related tasks, projects, and removing the user from groups where they are members. You can uncomment and customize this middleware as needed for your application's requirements.

## Usage

To use this User model in your application, import it where needed and create, update, or query user data according to your application's logic.

```javascript
const User = require('../model/user.model');

// Example: Creating a new user
const newUser = new User({
  firstname: 'John',
  lastname: 'Doe',
  email: 'johndoe@example.com',
  password: 'hashedPassword',
});

// Save the new user to the database
newUser.save()
  .then(savedUser => {
    console.log('User saved:', savedUser);
  })
  .catch(error => {
    console.error('Error saving user:', error);
  });

