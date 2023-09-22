const express = require('express');
const taskCtrl = require('../controllers/task.controller')
// const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(taskCtrl.getAll)
    .post(taskCtrl.create)

router.route('/:taskId')
    .get(taskCtrl.getOne)
    .put(taskCtrl.update)
    .delete(taskCtrl.delete)

module.exports = router;