const express = require('express');
const userCtrl = require('../controllers/user.controller')
// const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(userCtrl.getAll)
    .post(userCtrl.create)

router.route('/:userId')
    .get(userCtrl.getOne)
    .put(userCtrl.update)
    .delete(userCtrl.delete)

module.exports = router;