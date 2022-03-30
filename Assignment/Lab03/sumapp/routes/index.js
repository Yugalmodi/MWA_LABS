const express = require("express");
const router = express.Router();
const sumController = require("../controller/adding.controller");

router.route("/:num1")
    .get(sumController.sum);

module.exports = router;