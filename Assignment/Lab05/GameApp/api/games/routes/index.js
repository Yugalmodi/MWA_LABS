const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller")

router.route("/games")
    .get(gameController.getAll)
    .post();

router.route("/games/:gameId")
    .get(gameController.getOne)
    .post();

module.exports = router;