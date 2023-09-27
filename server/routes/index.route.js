const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/users", require("./user.route"));
router.use("/tasks", require("./task.route"));
router.use("/projects", require("./project.route"));
router.use("/groups", require("./group.route"));
router.use("/timetrackers", require("./timetracker.route"));
router.use("/payrolls", require("./payroll.route"));

module.exports = router;
