# Authentication Service

The `AuthService` class in the `auth.service.js` file provides services related to user authentication in your Node.js application. It includes methods for user registration, login, email verification, password management, and token generation.

## Methods

1. **Signup**

   - Method: `signup(data)`
   - Description: Registers a new user with the provided data. This method checks if the email already exists, generates an authentication token, saves the user to the database, and sends an email for email verification.

2. **Signin**

   - Method: `signin(data)`
   - Description: Authenticates a user by checking their email and password. If the user exists and the password is correct, it generates an authentication token and returns user information.

3. **Update Password**

   - Method: `updatePassword(userId, data)`
   - Description: Updates a user's password. It checks if the current password is correct, hashes the new password, and updates it in the database.

4. **Request Email Verification**

   - Method: `RequestEmailVerification(email)`
   - Description: Initiates the email verification process for a user. It generates a verification token, sends an email with a verification link, and stores the token in the database.

5. **Verify Email**

   - Method: `VerifyEmail(data)`
   - Description: Verifies a user's email address by comparing the provided verification token with the one stored in the database. If valid, it updates the user's email verification status.

6. **Request Password Reset**

   - Method: `RequestPasswordReset(email)`
   - Description: Initiates the password reset process by sending a password reset email with a unique token and storing the token in the database.

7. **Reset Password**

   - Method: `resetPassword(data)`
   - Description: Resets a user's password by validating the provided reset token, hashing the new password, and updating it in the database.

## Dependencies

The `AuthService` class relies on several dependencies, including models (`User` and `Token`), configuration settings from `config.env`, and utility functions like `sendEmail`. Ensure that these dependencies are correctly set up in your project.

## Usage

You can import and use the `AuthService` class in your controllers to handle user authentication and related operations.

Example:

```javascript
const AuthService = require('../services/auth.service');

// Signup
const userRegistrationData = { /* user data */ };
const registeredUser = await AuthService.signup(userRegistrationData);

// Signin
const userLoginData = { /* login data */ };
const authenticatedUser = await AuthService.signin(userLoginData);

// Other authentication-related operations
// ...
```

Ensure that you handle errors and validations appropriately in your controllers when using these authentication methods.

---
