const express = require('express');
const projectCtrl = require('../controllers/project.controller')
const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(projectCtrl.getAll)
    .post(projectCtrl.create)

router.route('/:projectId')
    .get(projectCtrl.getOne)
    .put(projectCtrl.update)
    .delete(projectCtrl.delete)

module.exports = router;