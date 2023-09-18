const express = require('express');
const taskCtrl = require('../controllers/task.controller')
const router = express.Router();

router.route('/api/tasks')
    .get(taskCtrl.list)
    .post(taskCtrl.create)

router.route('/api/tasks/:taskId')
    .get(taskCtrl.read)
    .put(taskCtrl.update)
    .delete(taskCtrl.remove)

router.param('taskId', taskCtrl.taskByID)

module.exports = router;