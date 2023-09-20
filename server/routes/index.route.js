const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/tasks", require("./task.route"));
router.use("/projects", require("./project.route"));
router.use("/groups", require("./group.route"));

module.exports = router;
