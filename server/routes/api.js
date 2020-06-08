const router = require("express").Router();
const studentsApi = require("../api/students");
const usersApi = require("../api/users");

router.use("/api/students", studentsApi);
router.use("/api/users", usersApi);

module.exports = router;
