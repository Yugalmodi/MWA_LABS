const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller")
const coursesController = require("../controller/courses.controller")

router.route("/students")
    .get(studentController.getAll);

router.route("/students/:studentId")
    .get(studentController.getOne);

    router.route("/students/:studentId/courses")
    .get(coursesController.getAll);

    router.route("/students/:studentId/courses/courseId")
    .get(coursesController.getOne);

module.exports = router;