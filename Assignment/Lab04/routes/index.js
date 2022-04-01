const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller");

router.route(process.env.ROUTE_GAME)
    .get(gameController.getAll)
    .post(gameController.addOne);

router.route(process.env.ROUTE_GAME_DEL)
    .get(gameController.deleteOne);

module.exports = router;