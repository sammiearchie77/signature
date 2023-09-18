const express = require('express')
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");



router.route("/api/auth/signin")
  .post(controller.signin);

router.route('/api/auth/signout')
  .get(controller.signout);

module.exports = router;
