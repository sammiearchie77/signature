const express = require('express');
const timetrackerCtrl = require('../controllers/group.controller')
// const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(timetrackerCtrl.getAll)
    .post(timetrackerCtrl.create)

router.route('/:timetrackerId')
    .get(timetrackerCtrl.getOne)
    .put(timetrackerCtrl.update)
    .delete(timetrackerCtrl.delete)

module.exports = router;