const express = require("express");
const Router = express.Router();
const gameController = require("../controller/game.controller");

Router.route("/games")
    .get(gameController.getAllGames)
    .post(gameController.addOne);

Router.route("/games/:gameId")
    .get(gameController.getOne)
    .delete(gameController.deleteOne);
    
module.exports = Router;