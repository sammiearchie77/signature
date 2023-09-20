const express = require('express');
const groupCtrl = require('../controllers/group.controller')
const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(groupCtrl.getAll)
    .post(groupCtrl.create)

router.route('/:groupId')
    .get(groupCtrl.getOne)
    .put(groupCtrl.update)
    .delete(groupCtrl.delete)

module.exports = router;