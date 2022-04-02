const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller")
const publisherController = require("../controller/publisher.controller")

router.route("/games")
    .get(gameController.getAll)
    .post();

router.route("/games/:gameId")
    .get(gameController.getOne)
    .post()
    .delete(gameController.deleteOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne)
    .post();

module.exports = router;