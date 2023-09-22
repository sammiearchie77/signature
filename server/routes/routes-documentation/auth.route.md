# Authentication Routes

The `auth.routes.js` file defines the routes for handling authentication-related operations in your Node.js application. These routes use the Express.js framework and are associated with the `AuthController` for handling user registration, login, email verification, and password reset.

## Routes

1. **Signup**

   - Route: `/signup`
   - Method: POST
   - Validation: Validates the request body against the `userSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.signup`

2. **Signin**

   - Route: `/signin`
   - Method: POST
   - Validation: Validates the request body against the `loginSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.signin`

3. **Request Email Verification**

   - Route: `/request-email-verification`
   - Method: POST
   - Validation: Validates the request body against the `verifyEmailSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.RequestEmailVerification`

4. **Verify Email**

   - Route: `/verify-email`
   - Method: POST
   - Validation: Validates the request body against the `verifyEmailSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.VerifyEmail`

5. **Request Password Reset**

   - Route: `/request-password-reset`
   - Method: POST
   - Validation: Validates the request body against the `requestPasswordResetSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.RequestPasswordReset`

6. **Reset Password**

   - Route: `/reset-password`
   - Method: POST
   - Validation: Validates the request body against the `resetPasswordSchema` using the `bodyValidation` middleware from the `validators/joi` module.
   - Controller Method: `AuthController.resetPassword`

## Dependencies

These routes depend on the following components:

- `bodyValidation`: A middleware for validating request bodies against schemas defined in the `validators/joi` module.
- `Schemas`: A set of Joi validation schemas defined in the `validators/joi` module.
- `AuthController`: The controller responsible for handling authentication-related operations.

Ensure that these dependencies are correctly set up and available in your project.

## Usage

To use these authentication routes in your application, import the `auth.routes.js` file and mount them on your Express.js app or router.

```javascript
const express = require('express');
const authRoutes = require('../routes/auth.routes');

const app = express();

// Mount the authentication routes
app.use('/auth', authRoutes);

// ... other routes and middleware ...

// Start your Express app
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

These routes are prefixed with `/auth`, meaning they will be available under URLs like `/auth/signup`, `/auth/signin`, etc.

Ensure that you set up the required controllers, validation schemas, and dependencies as mentioned in your project.

---

Feel free to customize this README to fit your project's specific needs and documentation standards.