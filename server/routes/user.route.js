const express = require('express');
const userCtrl = require('../controllers/user.controller')
// const { verifyToken } = require("../middlewares");

const router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.route('/')
    .get(userCtrl.getAll)
    .post(userCtrl.create)

router.route('/:userId')
    .get(userCtrl.getOne)
    .put(userCtrl.update)
    .delete(userCtrl.delete)

module.exports = router;
