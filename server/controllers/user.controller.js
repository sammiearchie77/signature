import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';
import admin from 'firebase-admin'

const create = async (req, res) => {
   try {
    const {name, email, role, password } = req.body;
    if (!displayName || !password || !email ) {
        return res.status(400).send({ message: 'Missing fields' })
    }

    const user = await admin.auth().createUser({
        name,
        email,
        password
    });
    await admin.auth().setCustomUserClaims(uid, { role })
    res.json({
        message: 'Registration successfull', user
    });
   } catch (err) {
        res.status(500).json({
            error: err.message
        });
   }
};

async function list(req, res) {
    try {
        let users = await admin.auth().listUsers()
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

/**
 * If a matching user is found in the database, the user object is appended
 * to the request object in the profile key. Then, the next() middleware is 
 * used to propagate control to the next relevant controller function.
 */

const userByID = async (req, res, next, uid) => {
    try {
        let user = await admin.auth().getUser(uid)
        if (!user)
            return res.status(400).json({
                errror: "User not found"
            })
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        });
    }
};

/**
 * The read function retrieves the user details from req.profile
 * and removes sensitive information, such as the hashed_password
 * and salt values, before sending the user object in the response to the requesting client.
 */

const read = (req, res) => {
    const sanitizeUser = userObj => {
        const sanitizedUser = { ...userObj};
        delete sanitizedUser.passwordHash;
        delete sanitizedUser.passwordSalt;
        return sanitizedUser
    }
    const userToReturn = sanitizeUser(req.profile)
    return res.json(userToReturn);
};

/**
 * The update function retrieves the user details from req.profile
 * and then uses the lodash module to extend and merge the changes that came in the request body to update the user data.
 * Before saving this updated user to the database, the updated field is populated with the current date to reflect the last updated timestamp.
 * Upon successfully saving this update, the updated user object is cleaned by removing sensitive data, such as hashed_password and salt ,
 * before sending the user object in the response to the requesting client.
 */

const update = async (req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

/**
 * When the Express app gets a DELETE request at '/api/users/:userId' ,
 * similar to read and update, it loads the user by ID and then the remove controller function is executed.
 */

const remove = async (req, res, next) => {
    try {
        let user = req.profile;
        let deletedUser = await admin.auth().deleteUser(user).then(() => {
            console.log('Successfully deleted user', deletedUser)
        })
        res.json(deletedUser)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};



export default {
    create, userByID, read, list, remove, update
}
