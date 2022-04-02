const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller");

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

module.exports = router;