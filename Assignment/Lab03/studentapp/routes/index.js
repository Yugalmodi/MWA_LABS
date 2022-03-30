const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");

router.route("/students")
    .get(studentController.getAllStudent);
router.route("/student/:studentNumber")
    .get(studentController.getOneStudent);

module.exports = router;