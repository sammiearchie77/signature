/**
 * We will keep the user routes simple
 * 
 * /api/users for the following;
 *  - Listing users with GET
 *  - Creating a new user with POST
 * 
 * /api/users/:userId for the following
 *  - Fetching a user with GET
 *  - Updating a user with PUT
 *  - Deleting a user with DELETE
 */


import express from 'express';
import userController from '../controllers/user.controller';
// import authController from '../controllers/auth.controller';

const router = express.Router();

/**
 * This route list and create user
 */

router.route('/users')
  .get(userController.list)
  .post((req, res) => {
    // console.log(req.body)
    console.log('Received POST request at /api/users');
    userController.create(req, res);
  });

  /**
   * This route read, update and delete a user by userID
   */
router.route('/users/:userId')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove)

router.param('userId', userController.userByID)

export default router;