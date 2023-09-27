const express = require('express');
const payrollCtrl = require('../controllers/group.controller')
// const { verifyToken } = require("../middlewares");

const router = express.Router();

router.route('/')
    .get(payrollCtrl.getAll)
    .post(payrollCtrl.create)

router.route('/:payrollId')
    .get(payrollCtrl.getOne)
    .put(payrollCtrl.update)
    .delete(payrollCtrl.delete)

module.exports = router;